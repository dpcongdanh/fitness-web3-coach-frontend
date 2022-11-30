import { HttpError, useTranslate } from "@pankod/refine-core";
import {
  Box,
  TextField,
  Edit,
  Input,
  Stack,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextFieldProps,
  SelectChangeEvent,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { IProfile } from "interfaces";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState, useEffect } from "react";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { uploadImage, getPublicImageUrl } from "api";

import countryListAllIsoData from "components/countriesList";

export const UserEdit: React.FC = () => {
  const t = useTranslate();
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IProfile, HttpError, IProfile>();

  // avatar state
  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [updatingUser, setUpdatingUser] = useState<boolean>(false);

  //Form field state

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [gender, setGender] = useState<string>("");

  const [dob, setDob] = useState<Dayjs | null>(null);

  const [country, setCountry] = useState("");

  useEffect(() => {
    if (formLoading) {
      register("email");
    }
    if (!formLoading && !queryResult?.isLoading) {
      console.log(getValues());
      const dob = getValues("dob");
      reset();
      setFirstName(getValues("first_name"));
      setLastName(getValues("last_name"));
      setGender(getValues("gender") || "");
      setDob(dob !== null && dob !== undefined ? dayjs(dob) : null);
      setCountry(getValues("country"));
    }
  }, [getValues, reset, queryResult?.isLoading, formLoading, register]);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    try {
      if (imageFile !== undefined) {
        setUpdatingUser(true);
        const uploaded = await uploadImage(
          imageFile,
          "avatar",
          `customers/${getValues("email")}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "avatar",
            uploaded?.Key.substring(uploaded?.Key.indexOf("/") + 1)
          );
          if (imageUrl !== undefined) setValue("avatar", imageUrl?.publicURL);
        }
      }
      saveButtonProps.onClick(e);
      setUpdatingUser(false);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setUpdatingUser(false);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(getValues());

      const target = event.target;
      const file: File = (target.files as FileList)[0];

      setImageFile(file);

      console.log(imageFile);
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      // setError("images", { message: "Upload failed. Please try again." });
      // setIsUploadLoading(false);
    }
  };

  // const {
  //   autocompleteProps,
  //   // defaultValueQueryResult
  // } = useAutocomplete<IClinic>({
  //   resource: "clinics",
  //   onSearch: (value) => [
  //     {
  //       field: "name",
  //       operator: "containss",
  //       value,
  //     },
  //   ],
  //   defaultValue: queryResult?.data?.data.clinic,
  // });

  // console.log(defaultValueQueryResult?.data?.data[0]);

  return (
    <Edit
      isLoading={formLoading}
      footerButtons={
        <LoadingButton
          type="submit"
          startIcon={<SaveOutlined />}
          loadingPosition="start"
          loading={formLoading || updatingUser}
          variant="contained"
          onClick={async (e) => handleSubmit(e)}
        >
          {t("buttons.save")}
        </LoadingButton>
      }
    >
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        paddingBottom="24px"
      >
        <Stack gap={1}>
          <Avatar
            alt={getValues("id")}
            src={imagePreview || getValues("avatar")}
            sx={{ width: 320, height: 320 }}
          />
          <label htmlFor="images-input">
            <Input
              id="images-input"
              type="file"
              sx={{ display: "none" }}
              onChange={onChangeHandler}
              // onChange={(event) => {
              //   console.log(event.target);
              // }}
            />
            <input id="file" {...register("avatar")} type="hidden" />
            <LoadingButton
              // loading={isUploadLoading}
              loadingPosition="start"
              startIcon={<FileUpload />}
              variant="contained"
              component="span"
            >
              {t("buttons.upload")}
            </LoadingButton>
            <br />
            {/* {errors.image && (
                            <Typography variant="caption" color="#fa541c">
                                {errors.image?.message}
                            </Typography>
                        )} */}
          </label>
        </Stack>
        <Stack gap={1} width="100%">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              component="form"
              // sx={{ display: "flex", flexDirection: "column" }}
              autoComplete="off"
            >
              {/* <TextField
              {...register("username", { required: "Username is required" })}
              error={!!errors?.username}
              helperText={errors.username?.message}
              margin="normal"
              // required
              fullWidth
              id="username"
              label={t("trainers.fields.username")}
              name="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value as string);
              }}
              autoFocus
            /> */}

              <TextField
                {...register("first_name", {
                  required: "First Name is required",
                })}
                error={!!errors?.first_name}
                helperText={errors.first_name?.message}
                margin="normal"
                // required
                fullWidth
                id="first_name"
                label={t("profiles.fields.first_name")}
                name="first_name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value as string);
                }}
              />
              <TextField
                {...register("last_name", {
                  required: "Last Name is required",
                })}
                error={!!errors?.last_name}
                helperText={errors.last_name?.message}
                margin="normal"
                // required
                fullWidth
                id="last_name"
                label={t("profiles.fields.last_name")}
                name="last_name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value as string);
                }}
              />
              <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("profiles.fields.country")}
                </InputLabel>
                <Select
                  {...register("country")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label={t("profiles.fields.country")}
                  onChange={(e) => {
                    setCountry(e.target.value as string);
                  }}
                >
                  {countryListAllIsoData.map((item) => {
                    return <MenuItem value={item.code3}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  {...register("gender")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={(event: SelectChangeEvent) => {
                    setGender(event.target.value as string);
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <DatePicker
                {...register("dob")}
                disableFuture
                // label={t("health_status_certificates.fields.expired_date")}
                label="DOB"
                openTo="day"
                views={["year", "month", "day"]}
                value={dob}
                onChange={(newValue) => {
                  if (newValue === null) setValue("dob", null);
                  else {
                    setValue("dob", newValue?.toDate().toLocaleDateString());
                  }
                  setDob(newValue);
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                  <TextField
                    // error={!!errors?.dob}
                    // helperText={errors.dob?.message as string}
                    fullWidth
                    // variant="standard"
                    margin="normal"
                    {...params}
                  />
                )}
              />
              {/* <Controller
          control={control}
          name="status"
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={["published", "draft", "rejected"]}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  required
                />
              )}
            />
          )}
        /> */}
              {/* <Controller
              control={control}
              name="clinic"
              rules={{ required: "Clinic is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteProps}
                  {...field}
                  // defaultValue={defaultValueQueryResult?.data?.data[0]}
                  onChange={(_, value) => {
                    console.log(value);
                    field.onChange(value?.id);
                  }}
                  getOptionLabel={(item) => {
                    return item.name ? item.name : "";
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined || option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // placeholder={defaultValueQueryResult?.data?.data[0].name}
                      label="Clinic"
                      margin="normal"
                      variant="outlined"
                      error={!!errors.clinic}
                      helperText={errors.clinic?.message}
                      required
                    />
                  )}
                />
              )}
            /> */}
            </Box>
          </LocalizationProvider>
        </Stack>
      </Stack>
    </Edit>
  );
};

import { HttpError, useTranslate } from "@pankod/refine-core";
import {
  Box,
  TextField,
  Edit,
  Input,
  Stack,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

// import { IPatient, IClinic } from "interfaces";

import { ITrainer } from "interfaces";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { uploadImage, getPublicImageUrl } from "api";

import countryListAllIsoData from "components/countriesList";

// import { createEditor, BaseEditor, Descendant } from "slate";

// import { Slate, Editable, withReact, ReactEditor } from "slate-react";

// type CustomElement = { type: "paragraph"; children: CustomText[] };
// type CustomText = { text: string };

// declare module "slate" {
//   interface CustomTypes {
//     Editor: BaseEditor & ReactEditor;
//     Element: CustomElement;
//     Text: CustomText;
//   }
// }

// const initialAbout: Descendant[] = [
//   {
//     type: "paragraph",
//     children: [{ text: "A line of text in a paragraph." }],
//   },
// ];

export const TrainerEdit: React.FC = () => {
  const t = useTranslate();
  // const [about] = useState(() => withReact(createEditor()));

  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ITrainer, HttpError, ITrainer>();

  // const imageInput = watch("image");

  // avatar state
  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingPatient, setCreatingPatient] = useState<boolean>(false);

  //Form field state

  const [userName, setUserName] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [about, setAbout] = useState("");

  const [location, setLocation] = useState("");

  useEffect(() => {
    if (formLoading) {
      register("about");
    }
    if (!formLoading && !queryResult?.isLoading) {
      console.log(getValues());
      reset();
      setUserName(getValues("username"));
      setFirstName(getValues("first_name"));
      setLastName(getValues("last_name"));
      setAbout(getValues("about"));
      setLocation(getValues("location"));
    }
  }, [getValues, reset, queryResult?.isLoading, formLoading, register]);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    setValue("about", about);
    console.log(getValues());

    try {
      if (imageFile !== undefined) {
        setCreatingPatient(true);
        const uploaded = await uploadImage(
          imageFile,
          "avatar",
          `patients/${getValues("username")}/`
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
      setCreatingPatient(false);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setCreatingPatient(false);
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
          loading={formLoading || creatingPatient}
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
            alt={getValues("username")}
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
              Upload
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
          <Box
            component="form"
            // sx={{ display: "flex", flexDirection: "column" }}
            autoComplete="off"
          >
            <TextField
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
            />

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
              label={t("trainers.fields.first_name")}
              name="first_name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value as string);
              }}
            />
            <TextField
              {...register("last_name", { required: "Last Name is required" })}
              error={!!errors?.last_name}
              helperText={errors.last_name?.message}
              margin="normal"
              // required
              fullWidth
              id="last_name"
              label={t("trainers.fields.last_name")}
              name="last_name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value as string);
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("trainers.fields.location")}
              </InputLabel>
              <Select
                {...register("location")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                label={t("trainers.fields.location")}
                onChange={(e) => {
                  setLocation(e.target.value as string);
                }}
              >
                {countryListAllIsoData.map((item) => {
                  return <MenuItem value={item.code3}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>

            {/* <Slate editor={about} value={initialAbout}>
              <Editable />
            </Slate> */}
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
        </Stack>
      </Stack>
      <Typography variant="h5" paddingBottom="4px">
        {t("trainers.fields.about")}
      </Typography>
      <ReactQuill theme="snow" value={about} onChange={setAbout} />
    </Edit>
  );
};

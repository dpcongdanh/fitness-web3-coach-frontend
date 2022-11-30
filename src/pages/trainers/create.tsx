import { HttpError, useTranslate } from "@pankod/refine-core";
import {
  Box,
  TextField,
  Create,
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

export const TrainerCreate: React.FC = () => {
  const t = useTranslate();
  // const [about] = useState(() => withReact(createEditor()));

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ITrainer, HttpError, ITrainer>();

  // const imageInput = watch("image");

  // avatar state
  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingPatient, setCreatingPatient] = useState<boolean>(false);

  //Form field state

  const [userName, setUserName] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");

  const [lastName, setLastName] = useState<string>("");

  const [about, setAbout] = useState<string>("");

  const [location, setLocation] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (formLoading) {
      register("about");
    }
  }, [formLoading, register]);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    setValue("about", about);
    console.log(getValues());
    // console.log(saveButtonProps);

    // console.log(watch("username"));
    // console.log(getValues());
    // setValue("image", "fegsegsegse");
    // console.log(imageFile);

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
    <Create
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
            <TextField
              {...register("email", {
                required: "Email address is required",
              })}
              error={!!errors?.email}
              helperText={errors.email?.message}
              margin="normal"
              // required
              fullWidth
              id="email"
              label={t("trainers.fields.email")}
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value as string);
              }}
            />
            <TextField
              {...register("phone", {
                required: "Phone number is required",
              })}
              error={!!errors?.phone}
              helperText={errors.phone?.message}
              margin="normal"
              // required
              fullWidth
              id="phone"
              label={t("trainers.fields.phone")}
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value as string);
              }}
            />
            <FormControl margin="normal" fullWidth>
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
          </Box>
        </Stack>
      </Stack>
      <Typography variant="h5" paddingBottom="4px">
        {t("trainers.fields.about")}
      </Typography>
      <ReactQuill theme="snow" value={about} onChange={setAbout} />
    </Create>
  );
};

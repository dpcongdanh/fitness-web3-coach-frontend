import {
  HttpError,
  useGetIdentity,
  useOne,
  useTranslate,
} from "@pankod/refine-core";
import {
  Box,
  TextField,
  Edit,
  Input,
  Stack,
  Avatar,
  SaveButton,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { IProfile } from "interfaces";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState, useEffect } from "react";

import { uploadImage, getPublicImageUrl } from "api";

export const AccountSettings: React.FC = () => {
  const t = useTranslate();

  const { data: user } = useGetIdentity();
  const showUserInfo = user && user.name;

  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    // control,
    // watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IProfile, HttpError, IProfile>({
    refineCoreProps: {
      id: user?.id,
      action: "edit",
      resource: "profiles",
      redirect: false,
    },
  });

  // const { data: userData, isLoading: userLoading } = useOne<IProfile>({
  //   resource: "profiles",
  //   id: user?.id || "",
  //   queryOptions: {
  //     enabled: !!user?.id,
  //   },
  // });

  // useEffect(() => {
  //   if (!userLoading) {
  //     // console.log("Is Loaded");
  //     console.log(getValues());
  //     setValue("id", userData?.data?.id || "");
  //     setValue("avatar", userData?.data?.avatar || "");
  //     setValue("first_name", userData?.data?.first_name || "");
  //     setValue("last_name", userData?.data?.last_name || "");
  //     setImagePreview(getValues("avatar"));
  //     console.log(getValues());
  //     // console.log(getValues());
  //     // console.log(userData);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userLoading]);

  // const imageInput = watch("image");

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [updatingUser, setUpdatingUser] = useState<boolean>(false);

  // const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
  //   console.log(getValues());
  //   saveButtonProps.onClick(e);
  // };

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);

    // console.log(watch("username"));
    // console.log(getValues());
    // setValue("image", "fegsegsegse");
    // console.log(imageFile);

    try {
      if (imageFile !== undefined) {
        setUpdatingUser(true);
        const uploaded = await uploadImage(
          imageFile,
          "avatar",
          `customers/${user?.name}/`
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
      resource="profiles"
      recordItemId={user?.id}
      goBack={null}
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
      // saveButtonProps={{
      //   disabled: creatingPatient,
      //   onClick: (e: BaseSyntheticEvent<object, any, any>) => {
      //     handleSubmit(e);
      //   },
      // }}
    >
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <Avatar
            // alt={getValues("id")}
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
              {...register("first_name", {
                required: "First Name is required",
              })}
              error={!!errors?.first_name}
              helperText={errors.first_name?.message}
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
            />
            <TextField
              {...register("last_name", { required: "Last Name is required" })}
              error={!!errors?.last_name}
              helperText={errors.last_name?.message}
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
            />
          </Box>
        </Stack>
      </Stack>
      {/* <Box textAlign="right">
        <LoadingButton
          type="submit"
          startIcon={<SaveOutlined />}
          loadingPosition="start"
          loading={formLoading}
          variant="contained"
          onClick={async (e) => handleSubmit(e)}
        >
          {t("buttons.save")}
        </LoadingButton>
      </Box> */}
    </Edit>
  );
};

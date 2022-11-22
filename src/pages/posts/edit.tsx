import { HttpError, useTranslate, useList } from "@pankod/refine-core";
import {
  Box,
  TextField,
  Edit,
  Input,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { IPost, ITrainer } from "interfaces";

import { FileUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { uploadImage, getPublicImageUrl } from "api";

export const PostEdit: React.FC = () => {
  const t = useTranslate();

  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IPost, HttpError, IPost>();

  const { data: authorsData, isLoading: authorsLoading } = useList<ITrainer>({
    resource: "trainers",
    // config: {
    //   filters: [{ field: "title", operator: "contains", value: search }],
    // },
    // queryOptions: {
    //   enabled: false,
    //   onSuccess: (data) => {
    //     setIsLoading(false);
    //     if (data.total > 0) {
    //       setPostsListResponse(data);
    //     }
    //   },
    // },
  });

  // const imageInput = watch("image");

  // avatar state
  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingPatient, setCreatingPatient] = useState<boolean>(false);

  //Form field state

  const [title, setTitle] = useState<string>("");

  const [summary, setSummary] = useState<string>("");

  const [author, setAuthor] = useState<number>(0);

  const [body, setBody] = useState<string>("");

  useEffect(() => {
    if (formLoading) {
      register("body");
    }
    if (!formLoading && !queryResult?.isLoading) {
      console.log(getValues());
      reset();
      console.log(getValues("user_id"));
      setTitle(getValues("title"));
      setAuthor(getValues("user_id"));
      setSummary(getValues("summary"));
      setBody(getValues("body"));
      // setFirstName(getValues("first_name"));
      // setLastName(getValues("last_name"));
      // setAbout(getValues("about"));
      // setLocation(getValues("location"));
    }
  }, [getValues, reset, queryResult?.isLoading, formLoading, register]);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    setValue("body", body);
    console.log(getValues());

    // console.log(imageFile);

    try {
      if (imageFile !== undefined) {
        setCreatingPatient(true);
        const authorUserName = authorsData?.data?.find((item) => {
          return item.id === getValues("user_id");
        })?.username;

        const uploaded = await uploadImage(
          imageFile,
          "posts",
          `${authorUserName}/${getValues("title")}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "posts",
            uploaded?.Key.substring(uploaded?.Key.indexOf("/") + 1)
          );
          if (imageUrl !== undefined) setValue("cover", imageUrl?.publicURL);
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
      saveButtonProps={{
        disabled: creatingPatient || formLoading,
        onClick: (e: BaseSyntheticEvent<object, any, any>) => {
          handleSubmit(e);
        },
      }}
    >
      <Stack gap={1} width="100%">
        <Box
          component="form"
          // sx={{ display: "flex", flexDirection: "column" }}
          sx={{ padding: "10px" }}
          autoComplete="off"
        >
          <TextField
            {...register("title", { required: "Title is required" })}
            error={!!errors?.title}
            helperText={errors.title?.message}
            margin="normal"
            // required
            fullWidth
            id="title"
            label={t("posts.fields.title")}
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value as string);
            }}
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t("posts.fields.author")}
            </InputLabel>
            <Select
              {...register("user_id", { required: "Author is required" })}
              // error={!!errors?.user_id}
              // helperText={errors.user_id?.message}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="user_id"
              value={author}
              label={t("posts.fields.author")}
              onChange={(e) => {
                console.log(e.target.value);
                setAuthor(e.target.value as number);
              }}
            >
              {authorsData?.data?.map((item) => {
                return (
                  <MenuItem value={item.id}>
                    {item.first_name + " " + item.last_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            {...register("summary")}
            error={!!errors?.summary}
            helperText={errors.summary?.message}
            margin="normal"
            // required
            fullWidth
            id="summary"
            label={t("posts.fields.summary")}
            multiline
            rows={4}
            name="summary"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value as string);
            }}
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
          <Typography variant="h5" paddingBottom="4px">
            {t("posts.fields.body")}
          </Typography>
          <ReactQuill theme="snow" value={body} onChange={setBody} />
          {/* <Avatar
            alt={getValues("username")}
            src={imagePreview || getValues("avatar")}
            sx={{ width: 320, height: 320 }}
          /> */}
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
            <input id="file" {...register("cover")} type="hidden" />
            <Typography variant="h5" paddingBottom="4px">
              {t("posts.fields.cover")}
            </Typography>
            <LoadingButton
              // loading={isUploadLoading}
              loadingPosition="start"
              startIcon={<FileUpload />}
              variant="contained"
              component="span"
            >
              Upload Cover Image
            </LoadingButton>
            <br />
            <Box sx={{ width: "480px", paddingTop: "10px" }}>
              {((imagePreview !== "" && imagePreview !== null) ||
                (getValues("cover") !== "" && getValues("cover") !== null)) && (
                <img
                  src={imagePreview || getValues("cover")}
                  srcSet={imagePreview || getValues("cover")}
                  alt={getValues("title")}
                  style={{ width: "inherit", height: "inherit" }}
                  loading="lazy"
                />
              )}
            </Box>
            {/* {errors.image && (
                            <Typography variant="caption" color="#fa541c">
                                {errors.image?.message}
                            </Typography>
                        )} */}
          </label>
        </Box>
      </Stack>
    </Edit>
  );
};

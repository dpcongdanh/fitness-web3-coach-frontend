import React, { useState, useEffect, useCallback } from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Box,
  Stack,
} from "@pankod/refine-mui";

import { LoadingButton } from "@mui/lab";

import { ITrainer } from "interfaces";
import {
  AddCircleOutlineOutlined,
  CancelOutlined,
  // FileUpload,
} from "@mui/icons-material";

import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";
import { useTranslate, useNotification } from "@pankod/refine-core";
import { getPublicImageUrl, uploadImage } from "api";

export type EditorDataProps = UseModalFormReturnType & {
  dialogTitle?: string;
  trainerInfo?: ITrainer;
  submitButtonText?: string;
};

export const ImageEditorDialog: React.FC<EditorDataProps> = ({
  register,
  formState: { errors },
  refineCore: { formLoading },
  getValues,
  setValue,
  modal: { visible, close },
  saveButtonProps,
  submitButtonText,
  dialogTitle,
  trainerInfo,
  reset,
}) => {
  const { open } = useNotification();
  const t = useTranslate();

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [uploadingImage, setUploadingImage] = useState<boolean>();

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
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

  const handleClose = useCallback(() => {
    console.log(getValues());
    setImageFile(undefined);
    setImagePreview("");
    setValue("image", "");
    reset();
    console.log(getValues());
    console.log(imagePreview);
    setSubmitted(false);
    close();
    return;
  }, [close, getValues, imagePreview, reset, setValue, setSubmitted]);

  useEffect(() => {
    console.log("submitted:" + submitted);
    console.log("formLoading:" + formLoading);
    if (formLoading === false && submitted) {
      handleClose();
    }
  }, [formLoading, handleClose, submitted]);

  // const handleFinish = () => {
  //   console.log(getValues());
  //   setImageFile(undefined);
  //   setImagePreview("");
  //   setValue("image", "");
  //   reset();
  //   console.log(getValues());
  //   console.log(imagePreview);
  //   // close();
  //   // return;
  // };

  const submitButtonClick = async (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => {
    console.log(getValues());
    if (
      getValues("title") === null ||
      getValues("title") === undefined ||
      getValues("title").length === 0
    ) {
      open?.({
        message: "Please enter your title first",
        description: "Error! You did not enter your title",
        type: "error",
      });
      saveButtonProps.onClick(e);
      return;
    }
    try {
      if (imageFile !== undefined) {
        setUploadingImage(true);
        const uploaded = await uploadImage(
          imageFile,
          "image-gallery",
          `${trainerInfo?.username}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "image-gallery",
            uploaded?.Key.substring(uploaded?.Key.indexOf("/") + 1)
          );
          if (imageUrl !== undefined) {
            setValue("image", imageUrl?.publicURL);
            console.log(getValues());
            saveButtonProps.onClick(e);
            setSubmitted(true);
          }
        }
        setUploadingImage(false);
      } else {
        if (getValues("image").length === 0) {
          open?.({
            message: "Please choose image from your computer",
            description: "Error! You did not select your image yet!",
            type: "error",
          });
          setUploadingImage(false);
          return;
        }
        saveButtonProps.onClick(e);
        setUploadingImage(false);
        // setSubmitted(true);
        // return;
      }
    } catch (error) {
      setUploadingImage(false);
    }
  };

  return (
    <div>
      <Dialog
        open={visible}
        onClose={handleClose}
        // onClose={() => {
        //   reset();
        //   close();
        // }}
      >
        <DialogTitle>{dialogTitle || "Image Management Dialog"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title and select image to be added
          </DialogContentText>
          <form
            className="form"
            // onSubmit={() => {
            //   handleSubmit(onFinish);
            //   handleClose();
            // }}
          >
            <TextField
              {...register("title", { required: "Title is required" })}
              error={!!errors?.title}
              helperText={errors.title?.message as string}
              autoFocus
              margin="dense"
              id="title"
              label={t("image_gallery.fields.title")}
              name="title"
              required
              fullWidth
              variant="standard"
            />
            <input
              {...register("user_id", {
                required: "Trainer is required",
              })}
              hidden
              id="user_id"
              name="user_id"
            />
            <Stack>
              {/* <Box
                component="img"
                alt={getValues("name")}
                src={
                  imagePreview ||
                  getValues("image") ||
                  "/images/product-placeholder.jpg"
                }
                sx={{ height: 260 }}
              /> */}

              <label htmlFor="images-input">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "260px",
                    marginTop: "16px",
                  }}
                >
                  <img
                    src={
                      imagePreview ||
                      getValues("image") ||
                      "/images/product-placeholder.jpg"
                    }
                    alt={getValues("name")}
                    style={{
                      height: "inherit",
                      width: "300px",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </Box>
                <Input
                  // {...register("image", { required: "Image is required" })}
                  id="images-input"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={onChangeHandler}
                  // error={!!errors?.image}
                  // helperText={errors.image?.message as string}
                  // hidden
                  // required
                  // helperText={errors.image?.message as string}
                  // onChange={(event) => {
                  //   console.log(event.target);
                  // }}
                />
                <input
                  id="file"
                  {...register("image", { required: "Image is required" })}
                  type="hidden"
                />
                {/* <LoadingButton
                  // loading={isUploadLoading}
                  loadingPosition="start"
                  startIcon={<FileUpload />}
                  variant="contained"
                  component="span"
                >
                  Upload
                </LoadingButton> */}
                <br />
                {/* {errors.image && (
                            <Typography variant="caption" color="#fa541c">
                                {errors.image?.message}
                            </Typography>
                        )} */}
              </label>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="error"
            startIcon={<CancelOutlined />}
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            type="submit"
            startIcon={<AddCircleOutlineOutlined />}
            loadingPosition="start"
            loading={formLoading || uploadingImage}
            // {...saveButtonProps}
            onClick={async (e) => {
              await submitButtonClick(e);
              // handleFinish();
            }}
          >
            {submitButtonText || "Submit"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

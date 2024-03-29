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
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";
import { useTranslate, useNotification } from "@pankod/refine-core";
import { getPublicImageUrl, uploadImage } from "api";

export type EditorDataProps = UseModalFormReturnType & {
  dialogTitle?: string;
  trainerInfo?: ITrainer;
  submitButtonText?: string;
};

export const TrainingPackageEditorDialog: React.FC<EditorDataProps> = ({
  register,
  formState: { errors },
  refineCore: { formLoading },
  getValues,
  setValue,
  modal: { visible, close },
  saveButtonProps,
  dialogTitle,
  submitButtonText,
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
      setValue("image", file);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formLoading, handleClose]);

  const submitButtonClick = async (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => {
    console.log(getValues());
    if (
      getValues("name") === null ||
      getValues("name") === undefined ||
      getValues("name").length === 0
    ) {
      open?.({
        message: "Please enter your training package's name first",
        description: "Error! You did not enter your training package's name",
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
          "training-packages",
          `${trainerInfo?.username}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "training-packages",
            uploaded?.Key.substring(uploaded?.Key.indexOf("/") + 1)
          );
          if (imageUrl !== undefined) {
            setValue("image", imageUrl?.publicURL);
            // console.log(getValues());
            // saveButtonProps.onClick(e);
            // setSubmitted(true);
          }
        }
        setUploadingImage(false);
      }
      saveButtonProps.onClick(e);
      setUploadingImage(false);
      setSubmitted(true);
      // else {
      //   if (
      //     getValues("image") === null ||
      //     getValues("image") === undefined ||
      //     getValues("image").length === 0
      //   ) {
      //     open?.({
      //       message: "Please choose image from your computer",
      //       description: "Error! You did not select your image yet!",
      //       type: "error",
      //     });
      //     setUploadingImage(false);
      //     return;
      //   }
      //   saveButtonProps.onClick(e);
      //   setUploadingImage(false);
      //   // setSubmitted(true);
      //   // return;
      // }
    } catch (error) {
      setUploadingImage(false);
    }
  };

  return (
    <div>
      <Dialog open={visible} onClose={handleClose}>
        <DialogTitle>{dialogTitle || "Product Management Dialog"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the training package's informations and select image of
            the product.
          </DialogContentText>
          <form className="form">
            <TextField
              {...register("name", { required: "Name is required" })}
              error={!!errors?.name}
              helperText={errors.name?.message as string}
              autoFocus
              margin="dense"
              id="name"
              label={t("training_packages.fields.name")}
              name="name"
              required
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("description")}
              multiline
              rows={4}
              error={!!errors?.description}
              helperText={errors.description?.message as string}
              margin="dense"
              id="description"
              label={t("training_packages.fields.description")}
              name="description"
              // required
              fullWidth
              variant="outlined"
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
                  id="images-input"
                  // {...register("image", { required: "Image is required" })}
                  type="file"
                  sx={{ display: "none" }}
                  onChange={onChangeHandler}
                />
                <input id="file" {...register("image")} type="hidden" />
                <br />
                {/* {errors.image && (
                            <Typography variant="caption" color="#fa541c">
                                {errors.image?.message}
                            </Typography>
                        )} */}
              </label>
            </Stack>
            <TextField
              {...register("session_count", {
                required: "Session Count is required",
              })}
              error={!!errors?.session_count}
              helperText={errors.session_count?.message as string}
              margin="dense"
              type="number"
              id="session_count"
              label={t("training_packages.fields.session_count")}
              name="session_count"
              required
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("price_per_session", {
                required: "Price is required",
              })}
              error={!!errors?.price_per_session}
              helperText={errors.price_per_session?.message as string}
              margin="dense"
              type="number"
              id="price_per_session"
              label={t("training_packages.fields.price_per_session")}
              name="price_per_session"
              required
              fullWidth
              variant="standard"
            />
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
            onClick={async (e) => {
              await submitButtonClick(e);
            }}
          >
            {submitButtonText || "Submit"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

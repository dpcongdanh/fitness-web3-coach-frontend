import React from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextFieldProps,
  useAutocomplete,
  Autocomplete,
} from "@pankod/refine-mui";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";

// import { IDoctor, IClinic, IDisease } from "interfaces";
import { IGallery } from "interfaces";
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import {
  Controller,
  UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

export type EditorDataProps = UseModalFormReturnType & {
  submitButtonText?: string;
};

export const ImageEditorDialog: React.FC<EditorDataProps> = ({
  register,
  control,
  formState: { errors },
  refineCore: { onFinish, formLoading },
  handleSubmit,
  getValues,
  setValue,
  modal: { visible, close },
  saveButtonProps,
  submitButtonText,
  reset,
}) => {
  const t = useTranslate();

  const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
    // if (getValues("expired_date") === "") setValue("expired_date", null);
    console.log(getValues());
    saveButtonProps.onClick(e);
  };

  return (
    <div>
      <Dialog
        open={visible}
        onClose={() => {
          reset();
          close();
        }}
      >
        <DialogTitle>{t("image_gallery.titles.create")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information and select image to be added
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form className="form" onSubmit={handleSubmit(onFinish)}>
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
                // defaultValue={"lsdjflksd"}
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
                // value={holder}
              />
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="error"
            startIcon={<CancelOutlined />}
            onClick={() => {
              reset();
              close();
            }}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            type="submit"
            startIcon={<AddCircleOutlineOutlined />}
            loadingPosition="start"
            loading={formLoading}
            // {...saveButtonProps}
            onClick={(e) => submitButtonClick(e)}
          >
            {submitButtonText || "Submit"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

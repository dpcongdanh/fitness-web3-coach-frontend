import { useTranslate, HttpError } from "@pankod/refine-core";
import {
  Edit,
  Box,
  TextField,
  Autocomplete,
  useAutocomplete,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { IPost, ICategory } from "interfaces";

export const PostEdit: React.FC = () => {
  const t = useTranslate();

  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm<IPost, HttpError, IPost & { category: ICategory }>();

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: t("errors.required.field", { field: "Title" }),
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          fullWidth
          label={t("posts.fields.title")}
          name="title"
          autoFocus
        />
        <Controller
          control={control}
          name="status"
          rules={{
            required: t("errors.required.field", { field: "Status" }),
          }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              options={["published", "draft", "rejected"]}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("posts.fields.status.title")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{
            required: t("errors.required.field", { field: "Category" }),
          }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  autocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString()
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option.id.toString() === value.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("posts.fields.category.title")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("content", {
            required: t("errors.required.field", { field: "Content" }),
          })}
          error={!!errors.content}
          helperText={errors.content?.message}
          margin="normal"
          label={t("posts.fields.content")}
          multiline
          rows={4}
        />
      </Box>
    </Edit>
  );
};

import {
  // useOne,
  useShow,
  useTranslate,
} from "@pankod/refine-core";

import parse from "html-react-parser";

import { Show, Stack, Typography, TagField, Avatar } from "@pankod/refine-mui";

import { ITrainer } from "interfaces";

export const TrainerShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<ITrainer>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  //   const { data: categoryData } = useOne<ICategory>({
  //     resource: "categories",
  //     id: record?.category.id || "",
  //     queryOptions: {
  //       enabled: !!record?.category.id,
  //     },
  //   });

  return (
    <Show isLoading={isLoading}>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Avatar
          alt={record?.username}
          src={record?.avatar}
          sx={{ width: 192, height: 192 }}
        />
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("trainers.fields.name")}
          </Typography>
          <Typography variant="body2">
            {record?.first_name + " " + record?.last_name}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {/* Location */}
            {t("trainers.fields.location")}
          </Typography>
          <Typography variant="body2">
            {/* <TagField value={record?.location} /> */}
            <Typography variant="body2">{record?.location}</Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {/* About */}
            {t("trainers.fields.about")}
          </Typography>
          <Typography variant="body2">{parse(record?.about || "")}</Typography>
        </Stack>
      </Stack>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack sx={{ gap: 1, minWidth: 320 }}>
          <Typography variant="h4" fontWeight="bold">
            {/* {t("trainers.fields.name")} */}
            Services
          </Typography>
        </Stack>
        <Stack sx={{ gap: 1, minWidth: 480 }}>
          <Typography variant="h4" fontWeight="bold">
            {/* {t("trainers.fields.name")} */}
            Certification
          </Typography>
        </Stack>
      </Stack>
    </Show>
  );
};

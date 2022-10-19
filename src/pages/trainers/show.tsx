import {
  // useOne,
  useShow,
  useTranslate,
  useMany,
} from "@pankod/refine-core";

import parse from "html-react-parser";

import {
  Show,
  Stack,
  Typography,
  TagField,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  MuiList,
  ImageList,
  ImageListItem,
} from "@pankod/refine-mui";

import { FitnessCenter } from "@mui/icons-material";

import { ITrainer, IService } from "interfaces";

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

  const { data: servicesData, isLoading: servicesLoading } = useMany<IService>({
    resource: "services",
    ids: record?.services || [],
    queryOptions: {
      enabled: record !== undefined ? record?.services.length > 0 : false,
    },
  });

  console.log(servicesData);

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

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
            {t("trainers.services")}
          </Typography>
          <Typography variant="body1">
            <MuiList>
              {!servicesLoading &&
                servicesData !== undefined &&
                servicesData.data.map((row, index) => (
                  <ListItem>
                    <ListItemIcon>
                      <FitnessCenter />
                    </ListItemIcon>
                    <ListItemText
                      primary={row.name}
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                ))}
            </MuiList>
          </Typography>
        </Stack>
        <Stack sx={{ gap: 1, minWidth: 480 }}>
          <Typography variant="h4" fontWeight="bold">
            {t("trainers.certification")}
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.image_gallery")}
        </Typography>
        <ImageList sx={{ width: 960, height: 600 }} cols={3} rowHeight={320}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=320&h=320&fit=crop&auto=format`}
                srcSet={`${item.img}?w=320&h=320&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
      <Stack gap={1}>
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.main_products")}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.posts")}
        </Typography>
      </Stack>
    </Show>
  );
};

import {
  // useOne,
  useShow,
  useTranslate,
  useMany,
  useList,
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
  Grid,
} from "@pankod/refine-mui";

import { FitnessCenter } from "@mui/icons-material";

import { ITrainer, IService, IGallery, IProduct, IPost } from "interfaces";

import { ProductCard } from "../../components/product-card";

import { PostCard } from "../../components/post-card";

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

  const { data: galleryData, isLoading: galleryLoading } = useList<IGallery>({
    resource: "image_gallery",
    config: {
      filters: [
        {
          field: "user_id",
          operator: "eq",
          value: record?.id || null,
        },
      ],
    },
  });

  const { data: productData, isLoading: productLoading } = useList<IProduct>({
    resource: "products",
    config: {
      filters: [
        {
          field: "user_id",
          operator: "eq",
          value: record?.id || null,
        },
      ],
    },
  });

  const { data: postsData, isLoading: postsLoading } = useList<IPost>({
    resource: "posts",
    config: {
      filters: [
        {
          field: "user_id",
          operator: "eq",
          value: record?.id || null,
        },
      ],
    },
  });

  console.log(galleryData);

  // const { data: galleryData, isLoading: galleryLoading } = useMany<IGallery>({
  //   resource: "image_gallery",
  //   ids: record?.services || [],
  //   queryOptions: {
  //     enabled: record !== undefined ? record?.services.length > 0 : false,
  //   },
  // });

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
          {!galleryLoading &&
            galleryData !== undefined &&
            galleryData.data.map((item) => (
              <ImageListItem key={item.image} sx={{ width: 320 }}>
                <img
                  // src={`${item.image}?w=320&h=320&fit=crop&auto=format`}
                  // srcSet={`${item.image}?w=320&h=320&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.image}`}
                  srcSet={`${item.image}`}
                  // width={240}
                  // height={240}
                  alt={item.title}
                  style={{ height: "inherit" }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Stack>
      <Stack gap={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.subscriptions")}
        </Typography>
        <MuiList>
          {!productLoading &&
            productData !== undefined &&
            productData.data.map((item) => (
              <ListItem>
                <ProductCard data={item}></ProductCard>
              </ListItem>
            ))}
        </MuiList>
      </Stack>
      <Stack gap={1}>
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.posts")}
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
        >
          {!postsLoading &&
            postsData !== undefined &&
            postsData.data.map((row, index) => (
              <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                <PostCard data={row}></PostCard>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Show>
  );
};

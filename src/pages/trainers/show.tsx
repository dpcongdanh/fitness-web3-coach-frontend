import {
  useShow,
  useTranslate,
  useMany,
  useList,
  useModal,
  // useCan,
  CanAccess,
} from "@pankod/refine-core";

import parse from "html-react-parser";

import {
  Show,
  Stack,
  Typography,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  MuiList,
  ImageList,
  ImageListItem,
  Grid,
  Box,
  CircularProgress,
  Container,
  List,
  Button,
  ImageListItemBar,
  IconButton,
  DeleteButton,
} from "@pankod/refine-mui";

import {
  FitnessCenter,
  Collections,
  AddBoxOutlined,
  Edit,
  Inventory,
} from "@mui/icons-material";

import {
  ITrainer,
  ICertification,
  IService,
  IGallery,
  IProduct,
  ICourse,
  IPost,
} from "interfaces";

import { ProductCard } from "../../components/product-card";

import { CourseCard } from "../../components/course-card";

import { PostCard } from "../../components/post-card";

import { VideoDialog } from "../../components/video-dialog";
import React from "react";
import { useModalForm } from "@pankod/refine-react-hook-form";

import {
  ImageEditorDialog,
  // ImageDetailDialog,
} from "components/trainer-management/image-gallery-dialog";

import {
  ProductEditorDialog,
  ProductDetailDialog,
} from "components/trainer-management/product-management-dialog";

export const TrainerShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<ITrainer>();

  // const { queryResult: galleryQueryResult, setShowId } = useShow<IGallery>({
  //   resource: "image_gallery",
  //   id: "0",
  // });

  // const {
  //   show: showDetailModal,
  //   close: closeDetailModal,
  //   visible: detailModalVisible,
  // } = useModal();

  const createGalleryModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "image_gallery",
      redirect: false,
    },
  });

  const editGalleryModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "image_gallery",
      redirect: false,
    },
  });

  const {
    setValue: setValueForGallery,
    modal: { show: showCreateGalleryModal },
  } = createGalleryModalFormReturnValues;

  const {
    modal: { show: showEditGalleryModal },
  } = editGalleryModalFormReturnValues;

  const createProductsModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "products",
      redirect: false,
    },
  });

  const editProductsModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "products",
      redirect: false,
    },
  });

  const {
    setValue: setValueForProduct,
    modal: { show: showCreateProductsModal },
  } = createProductsModalFormReturnValues;

  const {
    modal: { show: showEditProductsModal },
  } = editProductsModalFormReturnValues;

  const { data, isLoading } = queryResult;
  const record = data?.data;

  setValueForGallery("user_id", record?.id);
  setValueForProduct("user_id", record?.id);

  //   const { data: categoryData } = useOne<ICategory>({
  //     resource: "categories",
  //     id: record?.category.id || "",
  //     queryOptions: {
  //       enabled: !!record?.category.id,
  //     },
  //   });

  const serviceIds = record?.services !== null ? record?.services : [];

  const { data: servicesData, isLoading: servicesLoading } = useMany<IService>({
    resource: "services",
    ids: serviceIds || [],
    queryOptions: {
      enabled:
        record?.services !== null
          ? serviceIds !== undefined
            ? serviceIds?.length > 0
            : false
          : true,
    },
  });

  const certificationIds =
    record?.certifications !== null ? record?.certifications : [];
  const { data: certificationsData, isLoading: certificationsLoading } =
    useMany<ICertification>({
      resource: "certificates",
      ids: certificationIds || [],
      queryOptions: {
        enabled:
          record?.certifications !== null
            ? certificationIds !== undefined
              ? certificationIds?.length > 0
              : false
            : true,
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
      pagination: {
        pageSize: 10000,
        current: 1,
      },
    },
  });

  const { data: coursesData, isLoading: coursesLoading } = useList<ICourse>({
    resource: "courses",
    config: {
      filters: [
        {
          field: "user_id",
          operator: "eq",
          value: record?.id || null,
        },
      ],
      pagination: {
        pageSize: 10000,
        current: 1,
      },
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
      pagination: {
        pageSize: 10000,
        current: 1,
      },
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
      pagination: {
        pageSize: 10000,
        current: 1,
      },
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

  return isLoading ||
    servicesLoading ||
    certificationsLoading ||
    certificationsLoading ||
    galleryLoading ||
    productLoading ||
    postsLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "calc(100vh - 112px)",
      }}
    >
      <CircularProgress />
      <Typography>{t("trainers.show_loading")}</Typography>
    </Box>
  ) : (
    <Container>
      <Show isLoading={isLoading}>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Stack gap={1}>
            <Avatar
              alt={record?.username}
              src={record?.avatar}
              sx={{ width: 192, height: 192 }}
            />
            {record?.video !== null &&
              record?.video !== undefined &&
              record?.video.length > 0 && (
                <VideoDialog
                  buttonText="Why train with me?"
                  dialogTitle="Trainer's Introduction Video"
                  videoLink={record?.video}
                />
              )}
          </Stack>
          <Stack gap={1}>
            <Typography variant="body1" fontWeight="bold">
              {t("trainers.fields.full_name")}
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
            <Typography variant="body2">
              {parse(record?.about || "")}
            </Typography>
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
            <Stack>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
              >
                {!certificationsLoading &&
                  certificationsData !== undefined &&
                  certificationsData.data.map((row, index) => (
                    <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "fit-content",
                          color: "text.secondary",
                        }}
                        gap={1}
                      >
                        {/* <Avatar
                          src={
                            row?.image ||
                            "https://mhxuwblyckkausnppiws.supabase.co/storage/v1/object/sign/certificates/generic/Certification.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjZXJ0aWZpY2F0ZXMvZ2VuZXJpYy9DZXJ0aWZpY2F0aW9uLnBuZyIsImlhdCI6MTY2NjQ0NzcyNywiZXhwIjoxOTgxODA3NzI3fQ.PIbh5UD83atwxItAW2J_NO97dFHafLcUuE6elzSeQg4"
                          }
                        /> */}
                        <Avatar
                          src={row?.image || "/images/Certification.png"}
                        />
                        <Typography variant="body2">{row?.name}</Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack gap={1} justifyContent="center" alignItems="center"> */}
        <Stack gap={1}>
          <ImageEditorDialog
            submitButtonText={t("image_gallery.titles.create")}
            trainerInfo={queryResult.data?.data}
            {...createGalleryModalFormReturnValues}
          />
          <ImageEditorDialog
            submitButtonText={t("image_gallery.titles.edit")}
            trainerInfo={queryResult.data?.data}
            {...editGalleryModalFormReturnValues}
          />
          {/* <ImageDetailDialog
            loading={galleryLoading}
            data={galleryData?.data}
            close={closeDetailModal}
            visible={detailModalVisible}
          /> */}
          <List
            resource="image_gallery"
            breadcrumb={false}
            canCreate={false}
            headerButtons={
              <CanAccess
                resource="image_gallery"
                action="edit"
                // params={{ id: 1 }}
                fallback={null}
              >
                <Button
                  variant="contained"
                  onClick={() => showCreateGalleryModal()}
                >
                  <AddBoxOutlined
                    fontSize="small"
                    sx={{ marginLeft: "-4px", marginRight: "8px" }}
                  />
                  {t("image_gallery.titles.create")}
                </Button>
              </CanAccess>
            }
            title={
              <React.Fragment>
                <Collections
                  sx={{ verticalAlign: "middle", marginRight: "8px" }}
                />
                {t("trainers.image_gallery")}
              </React.Fragment>
            }
          >
            {/* <Typography variant="h4" fontWeight="bold">
              {t("trainers.image_gallery")}
            </Typography> */}
            {!galleryLoading ? (
              galleryData !== undefined && galleryData.total > 0 ? (
                <ImageList
                  // sx={{ width: 960, height: 600 }}
                  cols={3}
                  rowHeight={320}
                >
                  {galleryData.data.map((item) => (
                    <ImageListItem key={item.image}>
                      <img
                        src={`${item.image}`}
                        srcSet={`${item.image}`}
                        alt={item.title}
                        style={{ height: "inherit" }}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={new Date(
                          Date.parse(item.created_at)
                        ).toLocaleString()}
                        actionIcon={
                          <CanAccess
                            resource="image_gallery"
                            action="edit"
                            // params={{ id: 1 }}
                            fallback={null}
                          >
                            <React.Fragment>
                              <IconButton
                                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                aria-label={`info about ${item.title}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  showEditGalleryModal(item.id);
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <DeleteButton
                                // variant="text"
                                sx={{ display: "inline" }}
                                resourceNameOrRouteName="image_gallery"
                                size="small"
                                hideText
                                recordItemId={item?.id}
                              />
                              {/* <IconButton
                                // variant="text"
                                sx={{ margin: "0px", padding: "0px" }}
                              >
                                
                              </IconButton> */}
                            </React.Fragment>
                          </CanAccess>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "260px",
                  }}
                >
                  <img
                    src={"/images/product-placeholder.jpg"}
                    alt="Empty Gallery"
                    style={{
                      height: "inherit",
                    }}
                    loading="lazy"
                  />
                </Box>
              )
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "260px",
                }}
              >
                <CircularProgress />
                <Typography>{t("image_gallery.loading")}</Typography>
              </Box>
            )}
          </List>
        </Stack>
        <Stack gap={1} justifyContent="center" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            {t("trainers.courses")}
          </Typography>
          {!coursesLoading ? (
            coursesData !== undefined && coursesData.total > 0 ? (
              <MuiList>
                {coursesData.data.map((item) => (
                  <ListItem>
                    <CourseCard data={item}></CourseCard>
                  </ListItem>
                ))}
              </MuiList>
            ) : (
              <img
                // src={`${item.image}?w=320&h=320&fit=crop&auto=format`}
                // srcSet={`${item.image}?w=320&h=320&fit=crop&auto=format&dpr=2 2x`}
                src={
                  "https://via.placeholder.com/300x300.png?text=No+Subscription"
                }
                width={300}
                height={300}
                alt="Empty Subscription"
                style={{ height: "inherit" }}
                loading="lazy"
              />
            )
          ) : (
            "Loading"
          )}
        </Stack>
        <Stack gap={1}>
          <ProductEditorDialog
            submitButtonText={t("products.titles.create")}
            trainerInfo={queryResult.data?.data}
            {...createProductsModalFormReturnValues}
          />
          <ProductEditorDialog
            submitButtonText={t("products.titles.edit")}
            trainerInfo={queryResult.data?.data}
            {...editProductsModalFormReturnValues}
          />
          <List
            resource="products"
            breadcrumb={false}
            canCreate={false}
            headerButtons={
              <CanAccess
                resource="products"
                action="edit"
                // params={{ id: 1 }}
                fallback={null}
              >
                <Button
                  variant="contained"
                  onClick={() => showCreateProductsModal()}
                >
                  <AddBoxOutlined
                    fontSize="small"
                    sx={{ marginLeft: "-4px", marginRight: "8px" }}
                  />
                  {t("products.titles.create")}
                </Button>
              </CanAccess>
            }
            title={
              <React.Fragment>
                <Inventory
                  sx={{ verticalAlign: "middle", marginRight: "8px" }}
                />
                {t("trainers.products")}
              </React.Fragment>
            }
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {!productLoading ? (
                productData !== undefined && productData.total > 0 ? (
                  <MuiList>
                    {productData.data.map((item) => (
                      <ListItem>
                        <ProductCard
                          editButtonClick={() => {
                            showEditProductsModal(item?.id);
                          }}
                          data={item}
                        ></ProductCard>
                      </ListItem>
                    ))}
                  </MuiList>
                ) : (
                  <img
                    // src={`${item.image}?w=320&h=320&fit=crop&auto=format`}
                    // srcSet={`${item.image}?w=320&h=320&fit=crop&auto=format&dpr=2 2x`}
                    src={
                      "https://via.placeholder.com/300x300.png?text=No+Product"
                    }
                    width={300}
                    height={300}
                    alt="Empty Product"
                    style={{ height: "inherit" }}
                    loading="lazy"
                  />
                )
              ) : (
                "Loading"
              )}
            </Box>
          </List>
        </Stack>
        <Stack gap={1}>
          <Typography variant="h4" fontWeight="bold">
            {t("trainers.posts")}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 9 }}
          >
            {!postsLoading &&
              postsData !== undefined &&
              postsData.data.map((row, index) => (
                <Grid item xs={3} sm={3} md={3} key={index}>
                  <PostCard data={row}></PostCard>
                </Grid>
              ))}
          </Grid>
        </Stack>
      </Show>
    </Container>
  );
};

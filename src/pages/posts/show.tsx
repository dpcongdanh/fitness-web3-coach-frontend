import { useOne, useShow, useTranslate, useList } from "@pankod/refine-core";

import parse from "html-react-parser";

import {
  Show,
  Stack,
  Typography,
  Avatar,
  Paper,
  Container,
  Box,
  Divider,
  CircularProgress,
} from "@pankod/refine-mui";

import { ITrainer, IPost, IComment } from "interfaces";

import { PostCard } from "../../components/post-card";

import { CommentList } from "components/comment-box";

// const currentDate = new Date();

// console.log(currentDate);

const oldestVisibleArticlesDate = new Date();

const oldestDayToGOBack: number = 10;

oldestVisibleArticlesDate.setDate(
  oldestVisibleArticlesDate.getDate() - oldestDayToGOBack
);

// console.log(oldestVisibleArticlesDate);

export const PostShow: React.FC = () => {
  const t = useTranslate();

  const { data: latestPosts, isLoading: latestPostsLoading } = useList<IPost>({
    resource: "posts",
    config: {
      filters: [
        {
          field: "created_at",
          operator: "gte",
          value: oldestVisibleArticlesDate.toISOString(),
        },
      ],
      sort: [{ order: "desc", field: "created_at" }],
      pagination: { current: 1, pageSize: 5 },
    },
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

  const { queryResult } = useShow<IPost>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: trainerData, isLoading: trainerLoading } = useOne<ITrainer>({
    resource: "trainers",
    id: record?.user_id || "",
    queryOptions: {
      enabled: !!record?.user_id,
    },
  });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
  } = useList<IComment>({
    resource: "post_comments",
    config: {
      filters: [
        {
          field: "post_id",
          operator: "eq",
          value: record?.id,
        },
      ],
    },
    queryOptions: {
      enabled: !!record?.id,
    },
  });

  return isLoading || trainerLoading || latestPostsLoading ? (
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
      <Typography>{t("posts.show_loading")}</Typography>
    </Box>
  ) : (
    <Container>
      <Show isLoading={isLoading}>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Stack sx={{ display: "flex", width: "100%" }} gap={1}>
            <Typography variant="h4" fontWeight="bold">
              {record?.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                color: "text.secondary",
              }}
              gap={1}
            >
              <Avatar src={trainerData?.data.avatar} />
              <Typography variant="body2">
                {!trainerLoading && trainerData !== undefined
                  ? trainerData?.data.first_name +
                    " " +
                    trainerData?.data.last_name
                  : "loading"}
              </Typography>
              <Divider
                sx={{ color: "text.secondary", borderColor: "text.secondary" }}
                orientation="vertical"
                flexItem
              />
              <Typography variant="body2">
                {!trainerLoading && trainerData !== undefined
                  ? new Date(
                      Date.parse(trainerData.data.created_at)
                    ).toLocaleString()
                  : "loading"}
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              {record?.cover !== "" && record?.cover !== null && (
                <img
                  src={`${record?.cover}`}
                  srcSet={`${record?.cover}`}
                  alt={record?.title}
                  style={{ width: "inherit", height: "inherit" }}
                  loading="lazy"
                />
              )}
            </Box>
            <Typography variant="body2">{parse(record?.body || "")}</Typography>
            <Paper>
              <CommentList
                data={commentsData}
                post_id={record?.id}
                loading={commentsLoading || commentsFetching}
              />
            </Paper>
          </Stack>
          <Stack gap={1} sx={{ width: "500px" }}>
            <Typography variant="h6" fontWeight="bold">
              {t("posts.titles.latest_posts")}
            </Typography>
            {latestPosts?.data.map((row, index) => (
              <PostCard data={row}></PostCard>
            ))}
          </Stack>
        </Stack>
      </Show>
    </Container>
  );
};

import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Avatar,
  Box,
  Divider,
  Skeleton,
  ShowButton,
  Typography,
} from "@pankod/refine-mui";
import {
  useOne,
  // useShow,
  useTranslate,
  // useMany,
  // useList,
} from "@pankod/refine-core";
import { IPost, ITrainer } from "interfaces";

export type DataProps = {
  data?: IPost;
};

export const PostCard: React.FC<DataProps> = ({ data }) => {
  const t = useTranslate();

  const { data: trainerData, isLoading: trainerLoading } = useOne<ITrainer>({
    resource: "trainers",
    id: data?.user_id || "",
    queryOptions: {
      enabled: !!data?.user_id,
    },
  });

  return (
    <Card
    // sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="240"
        // image="https://www.dropbox.com/s/a36t7juz7rl0sqm/binhthanhmai-1665188876521.jpg?raw=1"
        image={data?.cover}
        alt={data?.title}
      />
      <CardContent sx={{ height: 192 }}>
        <Typography gutterBottom variant="h5" component="div">
          {data?.title}
        </Typography>
        {trainerLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
            gap={1}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width="75%" />
          </Box>
        ) : (
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
            <Typography variant="subtitle2" color="text.secondary">
              {trainerData?.data.first_name + " " + trainerData?.data.last_name}
            </Typography>
            <Divider
              sx={{ color: "text.secondary", borderColor: "text.secondary" }}
              orientation="vertical"
              flexItem
            />
            <Typography variant="subtitle2" color="text.secondary">
              {data !== undefined
                ? new Date(Date.parse(data.created_at)).toLocaleString()
                : "Loading"}
            </Typography>
          </Box>
        )}
        <Typography variant="body2" color="text.secondary">
          {data?.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <ShowButton
          size="small"
          resourceNameOrRouteName="posts"
          recordItemId={data?.id}
        >
          {t("posts.titles.show")}
        </ShowButton>
      </CardActions>
    </Card>
  );
};

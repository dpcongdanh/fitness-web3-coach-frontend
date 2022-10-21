import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ShowButton,
  Typography,
} from "@pankod/refine-mui";
import {
  // useOne,
  // useShow,
  useTranslate,
  // useMany,
  // useList,
} from "@pankod/refine-core";
import { IPost } from "interfaces";

export type DataProps = {
  data?: IPost;
};

export const PostCard: React.FC<DataProps> = ({ data }) => {
  const t = useTranslate();
  return (
    <Card
    // sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="240"
        // image="https://www.dropbox.com/s/a36t7juz7rl0sqm/binhthanhmai-1665188876521.jpg?raw=1"
        image={data?.cover}
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.title}
        </Typography>
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

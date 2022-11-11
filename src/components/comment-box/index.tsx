import React, { useState } from "react";
import {
  // Button,
  Avatar,
  Grid,
  Paper,
  Box,
  TextField,
  Typography,
  // Stack,
  DeleteButton,
} from "@pankod/refine-mui";
import {
  // useMany,
  useTranslate,
  useCreate,
  useGetIdentity,
  useList,
  useNotification,
} from "@pankod/refine-core";
import { IComment, IProfile } from "interfaces";

import { LoadingButton } from "@mui/lab";

import { AddComment } from "@mui/icons-material";

export type DataProps = {
  data?: IComment[];
  post_id?: number;
  loading?: boolean;
};

export const CommentBox: React.FC<DataProps> = ({ data, post_id, loading }) => {
  const { open } = useNotification();
  const t = useTranslate();

  const { data: user } = useGetIdentity();
  const showUserInfo = user && user.name;

  const { mutate } = useCreate<IComment>();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [commentText, setCommentText] = useState<string>("");

  const handleSubmit = () => {
    if (
      commentText === "" ||
      commentText.length === 0 ||
      commentText === undefined ||
      commentText === null
    ) {
      open?.({
        message: "Please enter your comment",
        description: "Error! Cannot submit empty comment",
        type: "error",
      });
      return;
    }
    setSubmitting(true);
    mutate(
      {
        resource: "post_comments",
        values: {
          user_uuid: user?.id,
          post_id: post_id,
          body: commentText,
        },
      },
      {
        onError: (error, variables, context) => {
          // An error happened!
          setSubmitting(false);
        },
        onSuccess: (data, variables, context) => {
          // Let's celebrate!
          setSubmitting(false);
          setCommentText("");
        },
      }
    );
  };

  // const profilesIds = data?.map((item) => item.user_uuid) || [];
  // const { data: profilesData, isLoading: profilesLoading } = useMany<IProfile>({
  //   resource: "profiles",
  //   ids: profilesIds,
  //   queryOptions: {
  //     enabled: profilesIds.length > 0,
  //   },
  // });

  const { data: profilesData, isLoading: profilesLoading } = useList<IProfile>({
    resource: "profiles",
  });

  // console.log(data);
  // console.log(profilesIds);

  // console.log(profilesData);

  return (
    <Box sx={{ padding: "16px" }}>
      <Box mb="30px">
        <Typography variant="h4" mb="16px" fontWeight="bold">
          {t("posts.fields.comments")}
        </Typography>
        {showUserInfo && (
          // <Stack direction="row" gap="16px" alignItems="center">
          //   {user.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
          //   {user.name && <Typography variant="subtitle2">{user?.id}</Typography>}
          // </Stack>
          <React.Fragment>
            <TextField
              id="outlined-multiline-static"
              label="Write your comment here"
              multiline
              rows={4}
              fullWidth
              value={commentText}
              disabled={submitting}
              onChange={(event) => {
                setCommentText(event.target.value);
              }}
            />
            <LoadingButton
              loadingPosition="start"
              startIcon={<AddComment />}
              loading={submitting}
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
          </React.Fragment>
        )}
      </Box>

      {data?.map((post, index) => {
        const profileInfo = profilesData?.data.find((profile) => {
          return profile.id === post.user_uuid;
        });
        return (
          <Paper key={index} style={{ padding: "40px 20px", marginTop: 10 }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Avatar" src={profileInfo?.avatar} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  {profileInfo?.first_name + " " + profileInfo?.last_name}
                </h4>
                <p style={{ textAlign: "left" }}>{post.body}</p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  Posted{" "}
                  {new Date(Date.parse(post.created_at)).toLocaleString()}
                </p>
              </Grid>
            </Grid>
            {profileInfo?.id === user.id && (
              <DeleteButton
                resourceNameOrRouteName="post_comments"
                recordItemId={post.id}
              ></DeleteButton>
            )}
          </Paper>
        );
      })}
    </Box>
  );

  //   return (
  //     <Card
  //     // sx={{ maxWidth: 320 }}
  //     >
  //       <CardMedia
  //         component="img"
  //         height="240"
  //         // image="https://www.dropbox.com/s/a36t7juz7rl0sqm/binhthanhmai-1665188876521.jpg?raw=1"
  //         image={data?.cover}
  //         alt={data?.title}
  //       />
  //       <CardContent sx={{ height: 192 }}>
  //         <Typography gutterBottom variant="h5" component="div">
  //           {data?.title}
  //         </Typography>
  //         {trainerLoading ? (
  //           <Box
  //             sx={{
  //               display: "flex",
  //               alignItems: "center",
  //               color: "text.secondary",
  //             }}
  //             gap={1}
  //           >
  //             <Skeleton variant="circular" width={40} height={40} />
  //             <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width="75%" />
  //           </Box>
  //         ) : (
  //           <Box
  //             sx={{
  //               display: "flex",
  //               alignItems: "center",
  //               width: "fit-content",
  //               color: "text.secondary",
  //             }}
  //             gap={1}
  //           >
  //             <Avatar src={trainerData?.data.avatar} />
  //             <Typography variant="subtitle2" color="text.secondary">
  //               {trainerData?.data.first_name + " " + trainerData?.data.last_name}
  //             </Typography>
  //             <Divider
  //               sx={{ color: "text.secondary", borderColor: "text.secondary" }}
  //               orientation="vertical"
  //               flexItem
  //             />
  //             <Typography variant="subtitle2" color="text.secondary">
  //               {data !== undefined
  //                 ? new Date(Date.parse(data.created_at)).toLocaleString()
  //                 : "Loading"}
  //             </Typography>
  //           </Box>
  //         )}
  //         <Typography variant="body2" color="text.secondary">
  //           {data?.summary}
  //         </Typography>
  //       </CardContent>
  //       <CardActions>
  //         <ShowButton
  //           size="small"
  //           resourceNameOrRouteName="posts"
  //           recordItemId={data?.id}
  //         >
  //           {t("posts.titles.show")}
  //         </ShowButton>
  //       </CardActions>
  //     </Card>
  //   );
};

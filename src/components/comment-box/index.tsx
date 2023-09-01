import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
} from "@pankod/refine-mui";
import {
  useTranslate,
  useCreate,
  useGetIdentity,
  useList,
  useNotification,
  GetListResponse,
} from "@pankod/refine-core";

import { IComment, IProfile } from "interfaces";

import { LoadingButton } from "@mui/lab";

import { AddComment } from "@mui/icons-material";
import { CommentBox } from "./comment-box";

export type DataProps = {
  data?: GetListResponse<IComment>;
  post_id?: number;
  loading?: boolean;
};

export const CommentList: React.FC<DataProps> = ({
  data,
  post_id,
  loading,
}) => {
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

  const { data: profilesData, isLoading: profilesLoading } = useList<IProfile>({
    resource: "profiles",
  });

  const currentUserProfile = profilesData?.data.find((profile) => {
    return profile.id === user.id;
  });

  return (
    <Box sx={{ padding: "16px" }}>
      <Box mb="30px">
        <Typography variant="h4" mb="16px" fontWeight="bold">
          {t("posts.fields.comments")}
        </Typography>
        {showUserInfo && (
          <>
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
          </>
        )}
      </Box>
      {loading || profilesLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "192px",
          }}
        >
          <CircularProgress />
          <Typography>{t("posts.fields.comments_loading")}</Typography>
        </Box>
      ) : data !== undefined && data.total > 0 ? (
        <Box>
          {data.data.map((comment, index) => {
            const profileInfo = profilesData?.data.find((profile) => {
              return profile.id === comment.user_uuid;
            });
            return (
              <CommentBox
                key={index}
                profileInfo={profileInfo}
                comment={comment}
                currentUserProfile={currentUserProfile}
                user={user}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "192px",
          }}
        >
          Be the first person to comment this post.
        </Box>
      )}
    </Box>
  );
};

import { Flag, AddComment, ThumbUp, ThumbDown } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  useNotification,
  useCreate,
  useUpdate,
  useDelete,
  useList,
} from "@pankod/refine-core";
import {
  Paper,
  Grid,
  Avatar,
  EditButton,
  DeleteButton,
  TextField,
  IconButton,
} from "@pankod/refine-mui";
import { IComment, ICommentLike, IProfile } from "interfaces";
import React, { useState } from "react";

export type DataProps = {
  // information of the person who uploaded this comment
  profileInfo?: IProfile | undefined;
  // comment data
  comment: IComment;
  // information of logged in person for permission check
  currentUserProfile?: IProfile | undefined;
  user: any;
};

export const CommentBox: React.FC<DataProps> = ({
  profileInfo,
  comment,
  currentUserProfile,
  user,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  const { open } = useNotification();

  const { mutate: createLike } = useCreate<ICommentLike>();

  const { mutate: updateLike } = useUpdate<ICommentLike>();

  const { mutate: removeLike } = useDelete<ICommentLike>();

  const { data: likesData, isLoading: likesLoading } = useList<ICommentLike>({
    resource: "post_comment_likes",
    config: {
      filters: [
        {
          field: "comment_id",
          operator: "eq",
          value: comment.id,
        },
      ],
      pagination: {
        pageSize: 10000,
        current: 1,
      },
    },
  });

  const { mutate } = useUpdate<IComment>();

  const handleLike = (thumbsup: boolean) => {
    const selectedCommentlikeData = likesData?.data.find((item) => {
      return (
        item.comment_id === comment.id &&
        item.user_uuid === currentUserProfile?.id
      );
    });
    if (
      selectedCommentlikeData !== undefined &&
      selectedCommentlikeData !== null
    ) {
      if (selectedCommentlikeData.thumbs_up === thumbsup) {
        removeLike({
          resource: "post_comment_likes",
          id: selectedCommentlikeData.id,
          successNotification: false,
        });
      } else {
        updateLike(
          {
            resource: "post_comment_likes",
            id: selectedCommentlikeData.id,
            values: {
              thumbs_up: thumbsup,
            },
            successNotification: false,
          }
          // {
          //   onError: (error, variables, context) => {
          //     // An error happened!
          //     // setSubmitting(false);
          //   },
          //   onSuccess: (data, variables, context) => {
          //     // Let's celebrate!
          //     // setSubmitting(false);
          //     // setCommentText("");
          //     // setEditMode(false);
          //   },
          // }
        );
      }
    } else {
      createLike(
        {
          resource: "post_comment_likes",
          values: {
            comment_id: comment.id,
            user_uuid: currentUserProfile?.id,
            thumbs_up: thumbsup,
          },
          successNotification: false,
        }
        // {
        //   onError: (error, variables, context) => {
        //     // An error happened!
        //     // setSubmitting(false);
        //   },
        //   onSuccess: (data, variables, context) => {
        //     // Let's celebrate!
        //     // setSubmitting(false);
        //     // setCommentText("");
        //     // setEditMode(false);
        //   },
        // }
      );
    }
  };

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
        id: comment.id,
        values: {
          // user_uuid: user?.id,
          // post_id: post_id,
          body: commentText,
        },
        // resource: "post_comments",
        // values: {
        //   user_uuid: user?.id,
        //   post_id: post_id,
        //   body: commentText,
        // },
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
          setEditMode(false);
        },
      }
    );
  };
  return (
    <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Avatar" src={profileInfo?.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>
            {profileInfo?.first_name + " " + profileInfo?.last_name}
          </h4>

          {!editMode ? (
            <p style={{ textAlign: "left" }}>{comment.body}</p>
          ) : (
            <>
              <TextField
                id="outlined-multiline-static"
                label="Write your comment here"
                sx={{
                  marginTop: "12px",
                }}
                multiline
                rows={4}
                fullWidth
                value={commentText}
                // disabled={submitting}
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
                Update
              </LoadingButton>
            </>
          )}
          <p style={{ textAlign: "left", color: "gray" }}>
            Commented at&nbsp;
            {new Date(Date.parse(comment.created_at)).toLocaleString()}
          </p>
          {comment.modified_at !== null && (
            <p style={{ textAlign: "left", color: "gray" }}>
              Last modified at&nbsp;
              {new Date(Date.parse(comment.modified_at)).toLocaleString()}
            </p>
          )}
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <IconButton
            aria-label="like"
            onClick={(e) => {
              handleLike(true);
            }}
          >
            <ThumbUp />
          </IconButton>
        </Grid>
        <Grid item>
          {
            likesData?.data.filter((item) => {
              return item.thumbs_up === true;
            }).length
          }
        </Grid>
        <Grid item>
          <IconButton
            aria-label="dislike"
            onClick={(e) => {
              handleLike(false);
            }}
          >
            <ThumbDown />
          </IconButton>
        </Grid>
        <Grid item>
          {
            likesData?.data.filter((item) => {
              return item.thumbs_up === false;
            }).length
          }
        </Grid>
        <Grid item>
          <LoadingButton
            startIcon={<Flag></Flag>}
            // resourceNameOrRouteName="post_comments"
            // recordItemId={comment.id}
          >
            Report
          </LoadingButton>
        </Grid>

        {(profileInfo?.id === user.id ||
          currentUserProfile?.role === "admin") && (
          <>
            <Grid item>
              <EditButton
                resourceNameOrRouteName="post_comments"
                recordItemId={comment.id}
                onClick={(e) => {
                  e.preventDefault();
                  setEditMode(!editMode);
                  setCommentText(comment.body);
                }}
              ></EditButton>
            </Grid>
            <Grid item>
              <DeleteButton
                resourceNameOrRouteName="post_comments"
                recordItemId={comment.id}
              ></DeleteButton>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

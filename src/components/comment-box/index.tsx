import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Avatar,
  Grid,
  Paper,
  Box,
  Divider,
  Skeleton,
  ShowButton,
  TextField,
  Typography,
} from "@pankod/refine-mui";
import {
  //   useOne,
  // useShow,
  useTranslate,
  // useMany,
  // useList,
} from "@pankod/refine-core";
import { IComment } from "interfaces";

export type DataProps = {
  data?: IComment[];
  loading?: boolean;
};

export const CommentBox: React.FC<DataProps> = ({ data, loading }) => {
  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  const t = useTranslate();

  //   const { data: trainerData, isLoading: trainerLoading } = useOne<ITrainer>({
  //     resource: "trainers",
  //     id: data?.user_id || "",
  //     queryOptions: {
  //       enabled: !!data?.user_id,
  //     },
  //   });

  return (
    <Box sx={{ padding: "14px" }}>
      <Typography variant="h4" mb="50px" fontWeight="bold">
        {t("posts.fields.comments")}
      </Typography>
      <TextField
        id="outlined-multiline-static"
        label="Write your comment here"
        multiline
        rows={4}
        fullWidth
        // defaultValue="Default Value"
      />
      <Button>Submit</Button>
      {data?.map((item) => (
        <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={imgLink} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>{item.email}</h4>
              <p style={{ textAlign: "left" }}>{item.body}</p>
              <p style={{ textAlign: "left", color: "gray" }}>
                Posted {new Date(Date.parse(item.created_at)).toLocaleString()}
              </p>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {/* <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper> */}
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

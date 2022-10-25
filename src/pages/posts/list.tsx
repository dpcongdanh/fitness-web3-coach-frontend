import React from "react";
import {
  useTranslate,
  // useMany,
  useList,
} from "@pankod/refine-core";
import {
  // useDataGrid,
  // DataGrid,
  // GridColumns,
  // List,
  Box,
  // Stack,
  // EditButton,
  // DeleteButton,
  Grid,
  CircularProgress,
  Typography,
} from "@pankod/refine-mui";

import { IPost } from "interfaces";

import { PostCard } from "../../components/post-card";

export const PostList: React.FC = () => {
  const t = useTranslate();

  const postListQueryResult = useList<IPost>({
    resource: "posts",
    config: {
      pagination: { current: 1, pageSize: 10 },
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      {postListQueryResult.isLoading ? (
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
          <Typography>{t("posts.loading")}</Typography>
        </Box>
      ) : postListQueryResult.data !== undefined &&
        postListQueryResult.data.total > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
        >
          {postListQueryResult.data.data.map((row, index) => (
            <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
              <PostCard data={row}></PostCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 112px)",
          }}
        >
          No Posts Found
        </Box>
        // <Box sx={{ display: "flex", lineHeight: "calc(100vh - 112px)" }}>
        //   No Doctors Found
        // </Box>
      )}
    </Box>
  );
};

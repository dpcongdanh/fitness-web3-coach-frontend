import React, { useState, useEffect } from "react";
import {
  useTranslate,
  // useMany,
  useList,
  GetListResponse,
  CanAccess,
  useCan,
} from "@pankod/refine-core";
import {
  // useDataGrid,
  // DataGrid,
  // GridColumns,
  List,
  Box,
  // Stack,
  // EditButton,
  // DeleteButton,
  Grid,
  CircularProgress,
  Typography,
  Divider,
  Paper,
  InputBase,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  // NativeSelect,
  Select,
  SelectChangeEvent,
  Pagination,
} from "@pankod/refine-mui";

import { Search } from "@mui/icons-material";

import { IPost, ITrainer } from "interfaces";

import { PostCard, PostCardAdmin } from "../../components/post-card";

export const PostList: React.FC = () => {
  const t = useTranslate();

  const [forceReload, setForceReload] = useState<null>();

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [search, setSearch] = useState<string>("");

  const [selectAuthor, setSelectAuthor] = useState<any>();

  const [postsListResponse, setPostsListResponse] =
    useState<GetListResponse<IPost>>();

  const { data: isAdmin } = useCan(
    {
      resource: "posts",
      action: "edit",
      // params: { foo: "optional-params" }
    }
    // queryOptions: {
    //     staleTime: 5 * 60 * 1000, // 5 minutes
    // }
  );

  const { refetch: refetchPosts } = useList<IPost>({
    resource: "posts",
    config: {
      filters: [{ field: "title", operator: "contains", value: search }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setPostsListResponse(data);
        }
      },
    },
  });

  const { refetch: refetchPostsWithAuthor } = useList<IPost>({
    resource: "posts",
    config: {
      filters: [
        { field: "title", operator: "contains", value: search },
        { field: "user_id", operator: "eq", value: selectAuthor },
      ],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setPostsListResponse(data);
        }
      },
    },
  });

  const trainerListQueryResult = useList<ITrainer>({
    resource: "trainers",
  });

  useEffect(() => {
    console.log(selectAuthor);
    setIsLoading(true);
    setPostsListResponse(undefined);
    if (selectAuthor !== undefined && selectAuthor !== "")
      refetchPostsWithAuthor();
    else refetchPosts();
  }, [refetchPosts, refetchPostsWithAuthor, search, selectAuthor, forceReload]);

  // const postListQueryResult = useList<IPost>({
  //   resource: "posts",
  //   config: {
  //     pagination: { current: 1, pageSize: 10 },
  //   },
  // });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          maxWidth: 640,
        }}
      >
        <IconButton disabled type="button" sx={{ p: "10px" }} aria-label="menu">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Posts"
          value={search}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search posts" }}
        />
        {/* <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={(event: any) => {
            console.log(event);
          }}
        >
          <Search />
        </IconButton> */}
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        {/* <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Posts"
          value={search}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search posts" }}
        /> */}
        <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Author</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            variant="standard"
            value={selectAuthor}
            onChange={(
              event: SelectChangeEvent<number>,
              child: React.ReactNode
            ) => {
              setSelectAuthor(event.target.value);
            }}
            // label="Select Author"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {trainerListQueryResult.data !== undefined &&
              trainerListQueryResult.data.total > 0 &&
              trainerListQueryResult.data.data.map((row, index) => (
                <MenuItem value={row.id}>
                  {row.first_name + " " + row.last_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
      </Paper>
      <List
        canCreate={isAdmin?.can || false}
        wrapperProps={{ sx: { minHeight: "calc(100vh - 230px)" } }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "calc(100vh - 340px)",
            }}
          >
            <CircularProgress />
            <Typography>{t("posts.loading")}</Typography>
          </Box>
        ) : postsListResponse !== undefined && postsListResponse.total > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 6, lg: 12, xl: 12 }}
          >
            <CanAccess
              resource="posts"
              action="edit"
              // params={{ id: 1 }}
              fallback={postsListResponse.data.map((row, index) => (
                <Grid item xs={3} sm={3} md={3} lg={4} xl={3} key={index}>
                  <PostCard data={row}></PostCard>
                </Grid>
              ))}
            >
              {postsListResponse.data.map((row, index) => (
                <Grid item xs={3} sm={3} md={3} lg={4} xl={3} key={index}>
                  <PostCardAdmin
                    data={row}
                    onDelete={() => {
                      setForceReload(null);
                    }}
                  ></PostCardAdmin>
                </Grid>
              ))}
            </CanAccess>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - (340px))",
            }}
          >
            No Posts Found
          </Box>
        )}
        <Pagination
          count={2}
          page={2}
          sx={{ marginTop: "12px" }}
          // onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          //   handlePageChange(page);
          // }}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </List>
    </Box>
  );
};

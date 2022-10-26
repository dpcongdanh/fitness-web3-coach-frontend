import React, { useState, useEffect } from "react";
import {
  useTranslate,
  // useMany,
  useList,
  GetListResponse,
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
  TextField,
  IconButton,
  Paper,
  InputBase,
  Divider,
} from "@pankod/refine-mui";

import { Search } from "@mui/icons-material";

import { ITrainer } from "interfaces";

import { TrainerCard } from "../../components/trainer-card";

export const TrainerList: React.FC = () => {
  const t = useTranslate();

  // const { dataGridProps } = useDataGrid<ITrainer>();

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [search, setSearch] = useState<string>("");
  // const [trainerListQueryResult, setTrainerListQueryResult] = useState<
  //   QueryObserverResult<GetListResponse<ITrainer>, HttpError>
  // >([]);

  const [trainerListResponse, setTrainerListResponse] =
    useState<GetListResponse<ITrainer>>();

  // const trainerListQueryResult = useList<ITrainer>({
  //   resource: "trainers",
  //   config: {
  //     pagination: { current: 1, pageSize: 10 },
  //   },
  // });

  const { refetch: refetchTrainers } = useList<ITrainer>({
    resource: "trainers",
    config: {
      filters: [{ field: "first_name", operator: "contains", value: search }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setTrainerListResponse(data);
        }
        // const postOptionGroup = data.data.map((item) =>
        //     renderItem(item.title, "posts", item.id),
        // );
        // if (postOptionGroup.length > 0) {
        //     setOptions([
        //         {
        //             label: renderTitle("Posts"),
        //             options: postOptionGroup,
        //         },
        //     ]);
        // }
      },
    },
  });

  console.log(trainerListResponse);

  // console.log(trainerListQueryResult);

  // console.log(trainerListQueryResult.data);

  useEffect(() => {
    setIsLoading(true);
    setTrainerListResponse(undefined);
    refetchTrainers();
  }, [refetchTrainers, search]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Trainers"
          value={search}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search trainers" }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={(event: any) => {
            console.log(event);
          }}
        >
          <Search />
        </IconButton>
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
      </Paper>
      {isLoading ? (
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
          <Typography>{t("trainers.loading")}</Typography>
        </Box>
      ) : trainerListResponse !== undefined && trainerListResponse.total > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
        >
          {trainerListResponse.data.map((row, index) => (
            <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
              <TrainerCard data={row}></TrainerCard>
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
          No Trainers Found
        </Box>
      )}
    </Box>
  );

  // return (
  //   <Box sx={{ flexGrow: 1 }}>
  //     <Paper
  //       component="form"
  //       sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
  //     >
  //       {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
  //       <MenuIcon />
  //     </IconButton> */}
  //       <InputBase
  //         sx={{ ml: 1, flex: 1 }}
  //         placeholder="Search Trainers"
  //         value={search}
  //         onChange={(
  //           event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  //         ) => {
  //           setSearch(event.target.value);
  //         }}
  //         inputProps={{ "aria-label": "search trainers" }}
  //       />
  //       <IconButton
  //         type="button"
  //         sx={{ p: "10px" }}
  //         aria-label="search"
  //         onClick={(event: any) => {
  //           console.log(event);
  //         }}
  //       >
  //         <Search />
  //       </IconButton>
  //       {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
  //       <Divider
  //         sx={{
  //           color: "text.secondary",
  //           borderColor: "text.secondary",
  //         }}
  //         orientation="vertical"
  //         flexItem
  //       />
  //       {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
  //       <DirectionsIcon />
  //     </IconButton> */}
  //     </Paper>
  //     {isLoading ? (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           flexDirection: "column",
  //           height: "calc(100vh - 112px)",
  //         }}
  //       >
  //         <CircularProgress />
  //         <Typography>{t("trainers.loading")}</Typography>
  //       </Box>
  //     ) : trainerListQueryResult.data !== undefined &&
  //       trainerListQueryResult.data.total > 0 ? (
  //       <Grid
  //         container
  //         spacing={{ xs: 2, md: 3 }}
  //         columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
  //       >
  //         {trainerListQueryResult.data.data.map((row, index) => (
  //           <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
  //             <TrainerCard data={row}></TrainerCard>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     ) : (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "calc(100vh - 112px)",
  //         }}
  //       >
  //         No Trainers Found
  //       </Box>
  //     )}
  //   </Box>
  // );
};

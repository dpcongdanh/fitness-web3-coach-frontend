import React from "react";
import {
  // useTranslate,
  // useMany,
  useList,
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
} from "@pankod/refine-mui";

import { ITrainer } from "interfaces";

import { TrainerCard } from "../../components/trainer-card";

export const TrainerList: React.FC = () => {
  // const t = useTranslate();

  // const { dataGridProps } = useDataGrid<ITrainer>();

  const trainerListQueryResult = useList<ITrainer>({
    resource: "trainers",
    config: {
      pagination: { current: 1, pageSize: 10 },
    },
  });

  console.log(trainerListQueryResult);

  console.log(trainerListQueryResult.data);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {trainerListQueryResult.isLoading ? (
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
          <Typography>Loading Trainers</Typography>
        </Box>
      ) : trainerListQueryResult.data !== undefined &&
        trainerListQueryResult.data.total > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
        >
          {trainerListQueryResult.data.data.map((row, index) => (
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
        // <Box sx={{ display: "flex", lineHeight: "calc(100vh - 112px)" }}>
        //   No Doctors Found
        // </Box>
      )}
    </Box>
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid
    //     container
    //     spacing={{ xs: 2, md: 3 }}
    //     columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
    //   >
    //     {!trainerListQueryResult.isLoading &&
    //       trainerListQueryResult.data !== undefined &&
    //       trainerListQueryResult.data.data.map((row, index) => (
    //         <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
    //           <TrainerCard data={row}></TrainerCard>
    //         </Grid>
    //       ))}
    //   </Grid>
    //   {/* <DataGrid {...dataGridProps} columns={columns} autoHeight /> */}
    // </Box>
  );
};

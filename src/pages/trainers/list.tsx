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

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  // const columns = React.useMemo<GridColumns<ITrainer>>(
  //   () => [
  //     {
  //       field: "id",
  //       headerName: t("trainers.fields.id"),
  //       type: "number",
  //       width: 50,
  //     },
  //     {
  //       field: "name",
  //       headerName: t("trainers.fields.name"),
  //       minWidth: 80,
  //       flex: 1,
  //     },
  //     {
  //       field: "first_name",
  //       headerName: t("trainers.fields.first_name"),
  //       minWidth: 100,
  //       flex: 1,
  //     },
  //     {
  //       field: "last_name",
  //       headerName: t("trainers.fields.last_name"),
  //       minWidth: 100,
  //       flex: 1,
  //     },
  //     {
  //       field: "location",
  //       headerName: t("trainers.fields.location"),
  //       minWidth: 80,
  //       flex: 1,
  //     },
  //     // {
  //     //   field: "category.id",
  //     //   headerName: t("posts.fields.category.title"),
  //     //   type: "number",
  //     //   headerAlign: "left",
  //     //   align: "left",
  //     //   minWidth: 250,
  //     //   flex: 0.5,
  //     //   renderCell: function render({ row }) {
  //     //     if (isLoading) {
  //     //       return "Loading...";
  //     //     }

  //     //     const category = categoriesData?.data.find(
  //     //       (item) => item.id === row.category.id
  //     //     );
  //     //     return category?.title;
  //     //   },
  //     // },
  //     // {
  //     //   field: "status",
  //     //   headerName: t("posts.fields.status.title"),
  //     //   minWidth: 120,
  //     //   flex: 0.3,
  //     // },
  //     {
  //       field: "actions",
  //       type: "actions",
  //       headerName: t("table.actions"),
  //       renderCell: function render({ row }) {
  //         return (
  //           <Stack direction="row" spacing={1}>
  //             <EditButton size="small" hideText recordItemId={row.id} />
  //             <DeleteButton size="small" hideText recordItemId={row.id} />
  //           </Stack>
  //         );
  //       },
  //       align: "center",
  //       headerAlign: "center",
  //       minWidth: 80,
  //     },
  //   ],
  //   [t]
  // );

  console.log(trainerListQueryResult);

  console.log(trainerListQueryResult.data);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
      >
        {!trainerListQueryResult.isLoading &&
          trainerListQueryResult.data !== undefined &&
          trainerListQueryResult.data.data.map((row, index) => (
            <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
              <TrainerCard data={row}></TrainerCard>
            </Grid>
          ))}
      </Grid>
      {/* <DataGrid {...dataGridProps} columns={columns} autoHeight /> */}
    </Box>
  );
};

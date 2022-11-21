import React, { useState, useEffect } from "react";
import {
  useTranslate,
  useMany,
  CrudFilters,
  useList,
  // useTable,
} from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  ShowButton,
  EditButton,
  DeleteButton,
  Divider,
  Paper,
  InputBase,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@pankod/refine-mui";

import { IProfile } from "interfaces";
import { Search } from "@mui/icons-material";

export const UserList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IProfile>();

  // const { tableQueryResult, setFilters: setFilters2 } = useTable<IPatient>();

  const [firstNameSearch, setFirstNameSearch] = useState<string>("");

  const [lastNameSearch, setLastNameSearch] = useState<string>("");

  const [selectGender, setSelectGender] = useState<string>("All");

  const [selectRole, setSelectRole] = useState<string>("All");

  // const [minManufacturingCost, setMinManufacturingCost] = useState<
  //   number | undefined
  // >();

  // const [maxManufacturingCost, setMaxManufacturingCost] = useState<
  //   number | undefined
  // >();

  // const [selectCategories, setSelectCategories] = useState<number[]>([]);

  useEffect(() => {
    const filter: CrudFilters = [
      {
        field: "first_name",
        operator: "contains",
        value: firstNameSearch,
      },
      {
        field: "last_name",
        operator: "contains",
        value: lastNameSearch,
      },
    ];
    if (
      selectGender !== undefined &&
      selectGender !== null &&
      selectGender !== "All"
    ) {
      filter.push({
        field: "gender",
        operator: "eq",
        value: selectGender,
      });
    }

    if (
      selectRole !== undefined &&
      selectRole !== null &&
      selectRole !== "All"
    ) {
      filter.push({
        field: "role",
        operator: "eq",
        value: selectRole,
      });
    }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstNameSearch, lastNameSearch, selectGender, selectRole]);

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  const columns: GridColumns<IProfile> = [
    // {
    //   field: "id",
    //   headerName: t("profiles.fields.id"),
    //   type: "number",
    //   minWidth: 50,
    //   maxWidth: 50,
    //   flex: 1,
    // },
    {
      field: "first_name",
      headerName: t("profiles.fields.first_name"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: t("profiles.fields.last_name"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gender",
      headerName: t("profiles.fields.gender"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "dob",
      headerName: t("profiles.fields.dob"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "role",
      headerName: t("profiles.fields.role"),
      minWidth: 100,
      flex: 1,
    },
    // {
    //   field: "category",
    //   headerName: t("products.fields.category"),
    //   // type: "number",
    //   minWidth: 100,
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     if (isLoading) {
    //       return "Loading...";
    //     }
    //     const category = categoriesData?.data.find(
    //       (item) => item.id === row.category
    //     );
    //     return category?.title;
    //   },
    // },
    // {
    //   field: "created_at",
    //   headerName: t("users.fields.createdAt"),
    //   minWidth: 150,
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return new Date(row.created_at).toLocaleString();
    //   },
    // },
    {
      field: "actions",
      type: "actions",
      headerName: t("table.actions"),
      renderCell: function render({ row }) {
        return (
          <Stack direction="row" spacing={1}>
            <ShowButton size="small" hideText recordItemId={row.id} />
            <EditButton size="small" hideText recordItemId={row.id} />
            <DeleteButton size="small" hideText recordItemId={row.id} />
          </Stack>
        );
      },
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      // flex: 1,
    },
  ];

  return (
    <Stack gap={1}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          // width: 960,
        }}
      >
        <IconButton disabled type="button" sx={{ p: "10px" }} aria-label="menu">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search First Name"
          value={firstNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setFirstNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search firstname" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Last Name"
          value={lastNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setLastNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search lastname" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Gender</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            // multiple
            variant="standard"
            value={selectGender}
            onChange={(
              event: SelectChangeEvent<string>,
              child: React.ReactNode
            ) => {
              setSelectGender(event.target.value as string);
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
            {/* {categoriesListQueryResult.data !== undefined &&
              categoriesListQueryResult.data.total > 0 &&
              categoriesListQueryResult.data.data.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.title}
                </MenuItem>
              ))} */}
          </Select>
        </FormControl>
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Role</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            // multiple
            variant="standard"
            value={selectRole}
            onChange={(
              event: SelectChangeEvent<string>,
              child: React.ReactNode
            ) => {
              setSelectRole(event.target.value as string);
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
        </FormControl>
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
      </Paper>
      <List>
        <DataGrid
          {...dataGridProps}
          // rows={
          //   tableQueryResult.data !== undefined
          //     ? tableQueryResult.data.data
          //     : []
          // }
          // loading={tableQueryResult.isLoading || tableQueryResult.isFetching}
          filterModel={undefined}
          disableColumnFilter={true}
          // filterModel={}
          columns={columns}
          autoHeight
        />
      </List>
    </Stack>
  );
};

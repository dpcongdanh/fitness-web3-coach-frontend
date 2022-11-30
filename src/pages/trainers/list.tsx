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
  // TextField,
  IconButton,
  Paper,
  InputBase,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  // width,
} from "@pankod/refine-mui";

import { Search } from "@mui/icons-material";

import { IService, ITrainer } from "interfaces";

import { TrainerCard, TrainerCardAdmin } from "../../components/trainer-card";

import countryListAllIsoData from "components/countriesList";

export const TrainerList: React.FC = () => {
  const t = useTranslate();

  // const { dataGridProps } = useDataGrid<ITrainer>();

  const [forceReload, setForceReload] = useState<null>();

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [firstNameSearch, setFirstNameSearch] = useState<string>("");

  const [lastNameSearch, setLastNameSearch] = useState<string>("");

  const [selectServices, setSelectServices] = useState<number[]>([]);

  const [selectCountries, setSelectCountries] = useState<number[]>([]);
  // const [trainerListQueryResult, setTrainerListQueryResult] = useState<
  //   QueryObserverResult<GetListResponse<ITrainer>, HttpError>
  // >([]);

  const { data: isAdmin } = useCan(
    {
      resource: "trainers",
      action: "edit",
      // params: { foo: "optional-params" }
    }
    // queryOptions: {
    //     staleTime: 5 * 60 * 1000, // 5 minutes
    // }
  );

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
      filters: [
        { field: "first_name", operator: "contains", value: firstNameSearch },
        { field: "last_name", operator: "contains", value: lastNameSearch },
      ],
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

  // const { refetch: refetchTrainersWithService } = useList<ITrainer>({
  //   resource: "trainers",
  //   config: {
  //     filters: [
  //       { field: "first_name", operator: "contains", value: search },
  //       // { field: "services", operator: "nbetween", value: 3 },
  //     ],
  //   },
  //   queryOptions: {
  //     enabled: false,
  //     onSuccess: (data) => {
  //       setIsLoading(false);
  //       if (data.total > 0) {
  //         setTrainerListResponse(data);
  //       }
  //     },
  //   },
  // });

  // const servicesListQueryResult = useList<IService>({
  //   resource: "services",
  // });

  const { refetch: refetchTrainersWithCountries } = useList<ITrainer>({
    resource: "trainers",
    config: {
      filters: [
        { field: "first_name", operator: "contains", value: firstNameSearch },
        { field: "last_name", operator: "contains", value: lastNameSearch },
        { field: "location", operator: "in", value: selectCountries },
      ],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setTrainerListResponse(data);
        }
      },
    },
  });

  const servicesListQueryResult = useList<IService>({
    resource: "services",
  });

  console.log(trainerListResponse);

  // console.log(trainerListQueryResult);

  // console.log(trainerListQueryResult.data);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTrainerListResponse(undefined);
  //   refetchTrainers();
  // }, [refetchTrainers, search]);

  useEffect(() => {
    // console.log(selectServices);
    setIsLoading(true);
    setTrainerListResponse(undefined);
    if (selectCountries !== undefined && selectCountries.length !== 0)
      refetchTrainersWithCountries();
    // if (selectServices !== undefined && selectServices.length !== 0)
    //   refetchTrainersWithService();
    else refetchTrainers();
  }, [
    refetchTrainers,
    refetchTrainersWithCountries,
    firstNameSearch,
    lastNameSearch,
    selectServices,
    selectCountries,
    forceReload,
  ]);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          inputProps={{ "aria-label": "search first name" }}
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
          inputProps={{ "aria-label": "search last name" }}
        />
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
        <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Services</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectServices}
            onChange={(
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
            ) => {
              setSelectServices(event.target.value as number[]);
            }}
            // onChange={(
            //   event: SelectChangeEvent<number>,
            //   child: React.ReactNode
            // ) => {
            //   setSelectServices(event.target.value);
            // }}
            // label="Select Author"
          >
            {servicesListQueryResult.data !== undefined &&
              servicesListQueryResult.data.total > 0 &&
              servicesListQueryResult.data.data.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
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
          <InputLabel>Select Country</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectCountries}
            onChange={(
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
            ) => {
              setSelectCountries(event.target.value as number[]);
            }}
          >
            {countryListAllIsoData.map((row, index) => (
              <MenuItem key={row.code} value={row.code3}>
                {row.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Location</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            variant="standard"
            value={selectService}
            onChange={(
              event: SelectChangeEvent<number>,
              child: React.ReactNode
            ) => {
              setSelectService(event.target.value);
            }}
            // label="Select Author"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {servicesListQueryResult.data !== undefined &&
              servicesListQueryResult.data.total > 0 &&
              servicesListQueryResult.data.data.map((row, index) => (
                <MenuItem value={row.id}>{row.name}</MenuItem>
              ))}
          </Select>
        </FormControl> */}
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
              height: "calc(100vh - (340px))",
            }}
          >
            <CircularProgress />
            <Typography>{t("trainers.loading")}</Typography>
          </Box>
        ) : trainerListResponse !== undefined &&
          trainerListResponse.total > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
          >
            <CanAccess
              resource="trainers"
              action="edit"
              // params={{ id: 1 }}
              fallback={trainerListResponse.data.map((row, index) => (
                <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                  <TrainerCard data={row}></TrainerCard>
                </Grid>
              ))}
            >
              {trainerListResponse.data.map((row, index) => (
                <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                  <TrainerCardAdmin
                    data={row}
                    onDelete={() => {
                      setForceReload(null);
                    }}
                  ></TrainerCardAdmin>
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
            No Trainers Found
          </Box>
        )}
      </List>
    </Box>
  );
};

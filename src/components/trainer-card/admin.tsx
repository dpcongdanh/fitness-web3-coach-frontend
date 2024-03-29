import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ShowButton,
  Typography,
  TagField,
  EditButton,
  DeleteButton,
} from "@pankod/refine-mui";

import { LocationOn } from "@mui/icons-material";
import { ITrainer } from "interfaces";

import countryListAllIsoData from "components/countriesList";

export type DataPropsAdmin = {
  data?: ITrainer;
  onDelete?: () => any;
};

export const TrainerCardAdmin: React.FC<DataPropsAdmin> = ({
  data,
  onDelete,
}) => {
  return (
    <Card
    // sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="240"
        image={data?.avatar || "/images/People_Placeholder.png"}
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.first_name + " " + data?.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <LocationOn sx={{ verticalAlign: "middle" }} />
          <TagField
            value={
              countryListAllIsoData.find(
                (country) => country.code3 === data?.location
              )?.name
            }
          />
        </Typography>
      </CardContent>
      <CardActions>
        <ShowButton size="small" recordItemId={data?.id} />
        <EditButton size="small" recordItemId={data?.id} />
        <DeleteButton
          onSuccess={onDelete}
          size="small"
          recordItemId={data?.id}
        />
      </CardActions>
    </Card>
  );
};

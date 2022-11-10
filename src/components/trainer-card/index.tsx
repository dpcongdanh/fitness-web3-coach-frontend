import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  // Button,
  ShowButton,
  Typography,
  TagField,
} from "@pankod/refine-mui";

import { LocationOn } from "@mui/icons-material";
import { ITrainer } from "interfaces";

import countryListAllIsoData from "components/countriesList";

export type DataProps = {
  data?: ITrainer;
};

export const TrainerCard: React.FC<DataProps> = ({ data }) => {
  return (
    <Card
    // sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="240"
        // image="https://www.dropbox.com/s/a36t7juz7rl0sqm/binhthanhmai-1665188876521.jpg?raw=1"
        image={data?.avatar}
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
      </CardActions>
    </Card>
  );
};

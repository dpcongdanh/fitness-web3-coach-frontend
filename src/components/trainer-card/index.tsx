import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ShowButton,
  Typography,
} from "@pankod/refine-mui";
import { ITrainer } from "interfaces";

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
          {data?.location}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">View Details</Button> */}
        <ShowButton size="small" recordItemId={data?.id} />
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
};

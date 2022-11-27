import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  // ShowButton,
  Typography,
  MuiList,
  ListItem,
  ListItemText,
} from "@pankod/refine-mui";
import { IProduct } from "interfaces";

export type DataProps = {
  data: IProduct | undefined;
};

export const ProductCard: React.FC<DataProps> = ({ data }) => {
  return (
    <Card sx={{ display: "flex", height: 192 }}>
      <CardMedia
        component="img"
        // height="240"
        // width="320"
        sx={{ width: 192 }}
        // image="https://www.dropbox.com/s/a36t7juz7rl0sqm/binhthanhmai-1665188876521.jpg?raw=1"
        image={data?.image || "https://via.placeholder.com/192?text=No+Image"}
        alt="image"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: 360 }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {data?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <MuiList dense={true}>
              awfwaf
              {/* {data !== undefined &&
                data?.description.map((item) => (
                  <ListItem>
                    <ListItemText primary={item} />
                  </ListItem>
                ))} */}
            </MuiList>
          </Typography>
        </CardContent>
        {/* <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          sefsefsefsef
        </Box> */}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 96 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ${data?.price}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <ShowButton size="small" recordItemId={data?.id} /> */}
          <Button size="large">Buy</Button>
        </CardActions>
      </Box>
    </Card>
  );
};

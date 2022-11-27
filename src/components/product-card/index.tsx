import React from "react";
import { CanAccess, useTranslate } from "@pankod/refine-core";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Typography,
  MuiList,
  DeleteButton,
} from "@pankod/refine-mui";
import { IProduct } from "interfaces";

import { AddShoppingCart, Paid, EditOutlined } from "@mui/icons-material";

export type DataProps = {
  data: IProduct | undefined;
  editButtonClick?: () => any;
  // onDelete?: () => any;
};

export const ProductCard: React.FC<DataProps> = ({
  data,
  // onDelete,
  editButtonClick,
}) => {
  const t = useTranslate();
  return (
    <Card sx={{ display: "flex", height: 192 }}>
      <CardMedia
        component="img"
        sx={{ width: 192 }}
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
            <MuiList dense={true}>{data?.description}</MuiList>
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 160 }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            ${data?.price}
          </Typography>
        </CardContent>
        <CardActions>
          <CanAccess
            resource="products"
            action="edit"
            // params={{ id: 1 }}
            fallback={
              <Box sx={{ width: 160 }}>
                <Button startIcon={<AddShoppingCart />} size="medium">
                  {t("products.buttons.add_to_cart")}
                </Button>
                <Button startIcon={<Paid />} size="medium">
                  {t("products.buttons.buy_now")}
                </Button>
              </Box>
            }
          >
            <Box sx={{ width: 160 }}>
              <Button
                startIcon={<EditOutlined />}
                onClick={editButtonClick}
                size="medium"
              >
                {t("buttons.edit")}
              </Button>
              {/* <EditButton
                size="medium"
                onClick={(
                  event:
                    | React.MouseEvent<HTMLButtonElement, MouseEvent>
                    | React.PointerEvent<HTMLButtonElement>
                ) => {
                  event.preventDefault();
                }}
                resourceNameOrRouteName="products"
                recordItemId={data?.id}
              /> */}
              <DeleteButton
                resourceNameOrRouteName="products"
                // onSuccess={onDelete}
                size="medium"
                recordItemId={data?.id}
              />
            </Box>
          </CanAccess>

          {/* <ShowButton size="small" recordItemId={data?.id} /> */}
        </CardActions>
      </Box>
    </Card>
  );
};

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
import { ITrainingPackage } from "interfaces";

import { AddShoppingCart, Paid, EditOutlined } from "@mui/icons-material";

export type DataProps = {
  data: ITrainingPackage | undefined;
  editButtonClick?: () => any;
};

export const TrainingPackageCard: React.FC<DataProps> = ({
  data,
  editButtonClick,
}) => {
  const t = useTranslate();
  return (
    <Card sx={{ display: "flex", height: 192 }}>
      <CardMedia
        component="img"
        sx={{ width: 192 }}
        // image={data?.image || "https://via.placeholder.com/192?text=No+Image"}
        image={data?.image || "/images/product-placeholder.jpg"}
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
            component="pre"
            overflow="auto"
          >
            {data?.description}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 160 }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            textAlign="center"
          >
            ${data?.price_per_session}/session
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {data?.session_count} sessions
          </Typography>
        </CardContent>
        <CardActions>
          <CanAccess
            resource="training_packages"
            action="edit"
            // params={{ id: 1 }}
            fallback={
              <Box sx={{ width: 160 }}>
                <Button startIcon={<AddShoppingCart />} size="medium">
                  {t("training_packages.buttons.add_to_cart")}
                </Button>
                <Button startIcon={<Paid />} size="medium">
                  {t("training_packages.buttons.buy_now")}
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
              <DeleteButton
                resourceNameOrRouteName="training_packages"
                size="medium"
                recordItemId={data?.id}
              />
            </Box>
          </CanAccess>
        </CardActions>
      </Box>
    </Card>
  );
};

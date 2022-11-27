import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@pankod/refine-mui";

// import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { LoadingButton } from "@mui/lab";

import {
  //   IClinic,
  //   ITrainer,
  IGallery,
  //   IHealthStatusCertificates,
  //   IDoctor,
  //   IDisease,
} from "interfaces";
// import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

// import {
//   Controller,
//   UseModalFormReturnType,
// } from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

export type DataProps = {
  loading?: boolean;
  data?: IGallery[];
  //   trainersData?: ITrainer[];
  visible: boolean;
  close: () => void;
};

export const ProductDetailDialog: React.FC<DataProps> = ({
  loading,
  data,
  //   trainersData,
  visible,
  close,
}) => {
  const t = useTranslate();

  //   const issuer = issuersData?.find((item) => item.id === data?.issuer);
  //   const examiner = examinersData?.find((item) => item.id === data?.examiner);

  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>{t("image_gallery.titles.show")}</DialogTitle>
        <DialogContent sx={{ minWidth: "500px", minHeight: "440px" }}>
          awfawfawfaw
          {/* <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.name")}
          </Typography>
          <Typography variant="body2">{data?.name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.disease")}
          </Typography>
          <Typography variant="body2">
            {diseasesData?.find((item) => item.id === data?.disease)?.name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.description")}
          </Typography>
          <Typography variant="body2">{data?.description}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.issuer")}
          </Typography>
          <Typography variant="body2">
            {issuer?.first_name + " " + issuer?.last_name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.validator")}
          </Typography>
          <Typography variant="body2">
            {validatorsData?.find((item) => item.id === data?.validator)?.name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.examiner")}
          </Typography>
          <Typography variant="body2">
            {examiner?.first_name + " " + examiner?.last_name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.issued_date")}
          </Typography>
          <Typography variant="body2">{data?.issued_date}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.expired_date")}
          </Typography>
          <Typography variant="body2">{data?.expired_date}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.status")}
          </Typography>
          <Typography variant="body2">{data?.status}</Typography> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";

import {
  // Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogActions,
  IconButton,
  Typography,
} from "@pankod/refine-mui";
import {
  ISelectedEventInfo,
  IService,
  ITrainer,
  ITrainingPackage,
} from "interfaces";
// import Iframe from "react-iframe";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export type EventProps = {
  visible: boolean;
  close: () => void;
  buttonText?: string;
  eventInfo?: ISelectedEventInfo;
  trainersData?: ITrainer[];
  servicesData?: IService[];
  trainingPackagesData?: ITrainingPackage[];
  dialogTitle?: string;
};

export const EventDialog: React.FC<EventProps> = ({
  visible,
  close,
  // buttonText,
  eventInfo,
  trainersData,
  servicesData,
  trainingPackagesData,
  dialogTitle,
}) => {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const trainer = trainersData?.find((item) => {
    return item.id === eventInfo?.extendedProps.trainer_id;
  });

  const service = servicesData?.find((item) => {
    return item.id === eventInfo?.extendedProps.service;
  });

  const trainingPackage = trainingPackagesData?.find((item) => {
    return item.id === eventInfo?.extendedProps.training_package;
  });

  return (
    <div>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={visible}
        maxWidth="md"
        fullWidth={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={close}>
          {dialogTitle || "Event Info"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" gutterBottom>
            Title
          </Typography>

          <Typography variant="body1" gutterBottom>
            {/* {eventInfo?.title} */}
            {trainingPackage?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Trainer
          </Typography>
          <Typography variant="body1" gutterBottom>
            {trainer?.first_name + " " + trainer?.last_name}
          </Typography>

          <Typography variant="h5" gutterBottom>
            Service
          </Typography>
          <Typography variant="body1" gutterBottom>
            {service?.name}
          </Typography>

          <Typography variant="h5" gutterBottom>
            Start At
          </Typography>
          <Typography variant="body1" gutterBottom>
            {eventInfo !== undefined
              ? new Date(Date.parse(eventInfo.start)).toLocaleString()
              : "Loading"}
          </Typography>
          <Typography variant="h5" gutterBottom>
            End At
          </Typography>
          <Typography variant="body1" gutterBottom>
            {eventInfo !== undefined
              ? new Date(Date.parse(eventInfo.end)).toLocaleString()
              : "Loading"}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" gutterBottom>
            {eventInfo?.extendedProps.description}
          </Typography>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
};

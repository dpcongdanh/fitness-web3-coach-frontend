import React, { useEffect, useState } from "react";
import {
  useGetIdentity,
  // useTranslate,
  // useMany,
  useList,
  useMany,
  useModal,
} from "@pankod/refine-core";
// import { gapi } from "gapi-script";
import FullCalendar, { EventSourceInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import {
  // useDataGrid,
  // DataGrid,
  // GridColumns,
  List,
  // Box,
  // MuiList,
  // ListItem,
  // ListItemText,
  // Stack,
  // EditButton,
  // DeleteButton,
  // Grid,
} from "@pankod/refine-mui";

import { EventDialog } from "../../components/event-dialog";
import { ISchedule, ISelectedEventInfo, ITrainer } from "interfaces";

const calendarID = process.env.REACT_APP_CALENDAR_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

export const CalendarList: React.FC = () => {
  const { data: user } = useGetIdentity();
  const showUserInfo = user && user.name;

  const { show, close, visible } = useModal();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedEventData, setSelectedEventData] =
    useState<ISelectedEventInfo>();

  const [schedulesList, setSchedulesList] = useState<ISchedule[]>([]);

  const { refetch: refetchSchedules } = useList<ISchedule>({
    resource: "schedules",
    config: {
      filters: [{ field: "customer_id", operator: "eq", value: user?.id }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setSchedulesList(data?.data);
        }
      },
      onError: (err) => {
        setIsLoading(false);
      },
    },
  });

  const trainerIds = schedulesList.map((item) => item.trainer_id);
  const { data: trainersData, isLoading: trainersLoading } = useMany<ITrainer>({
    resource: "trainers",
    ids: trainerIds,
    queryOptions: {
      enabled: trainerIds.length > 0,
    },
  });

  // const { data: trainersData, isLoading: trainersLoading } = useList<ITrainer>({
  //   resource: "trainers",
  //   config: {
  //     filters: [{ field: "customer_id", operator: "eq", value: user?.id }],
  //   },
  //   queryOptions: {
  //     enabled: false,
  //     onSuccess: (data) => {
  //       setIsLoading(false);
  //       if (data.total > 0) {
  //         setSchedulesList(data?.data);
  //       }
  //     },
  //     onError: (err) => {
  //       setIsLoading(false);
  //     },
  //   },
  // });
  // const [events, setEvents]: any = useState([]);

  // const getEvents = (calendarID?: string, apiKey?: string) => {
  //   function initiate() {
  //     gapi.client
  //       .init({
  //         apiKey: apiKey,
  //       })
  //       .then(function () {
  //         return gapi.client.request({
  //           path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
  //         });
  //       })

  //       .then(
  //         (response: any) => {
  //           let events = response.result.items;
  //           setEvents(events);
  //           return events;
  //         },
  //         function (err: any) {
  //           return [false, err];
  //         }
  //       );
  //   }

  //   gapi.load("client", initiate);
  // };

  useEffect(() => {
    // const events = getEvents(calendarID, apiKey);
    // console.log(events);
    console.log(showUserInfo);
    if (showUserInfo !== undefined || showUserInfo !== null) refetchSchedules();
  }, [refetchSchedules, showUserInfo]);

  return (
    <List contentProps={{ sx: { height: "calc(100vh - 192px)" } }}>
      <EventDialog
        eventInfo={selectedEventData}
        trainersData={trainersData?.data}
        visible={visible}
        close={close}
      />
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          googleCalendarPlugin,
        ]}
        googleCalendarApiKey={apiKey}
        initialView="dayGridMonth"
        height={"100%"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        // events={events}
        // events={{
        //   googleCalendarId: calendarID,
        //   className: "gcal-event",
        // }}
        events={schedulesList as EventSourceInput}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          console.log(info.event.toJSON());
          setSelectedEventData(info.event.toJSON() as ISelectedEventInfo);
          show();
        }}
      />
    </List>
  );
};

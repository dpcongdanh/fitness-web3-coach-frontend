import React, { useEffect, useState } from "react";
import {
  // useTranslate,
  // useMany,
  useList,
} from "@pankod/refine-core";
// import { gapi } from "gapi-script";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import {
  // useDataGrid,
  // DataGrid,
  // GridColumns,
  List,
  Box,
  MuiList,
  ListItem,
  ListItemText,
  // Stack,
  // EditButton,
  // DeleteButton,
  Grid,
} from "@pankod/refine-mui";

const calendarID = process.env.REACT_APP_CALENDAR_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

export const CalendarList: React.FC = () => {
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

  // useEffect(() => {
  //   const events = getEvents(calendarID, apiKey);
  //   console.log(events);
  // }, []);

  return (
    <List contentProps={{ sx: { height: "calc(100vh - 192px)" } }}>
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
        events={{
          googleCalendarId: calendarID,
          className: "gcal-event",
        }}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          console.log(info.event.toJSON());
        }}
      />
    </List>
  );
};

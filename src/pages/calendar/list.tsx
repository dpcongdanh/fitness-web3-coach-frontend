import React, { useEffect, useState } from "react";
import {
  // useTranslate,
  // useMany,
  useList,
} from "@pankod/refine-core";
import { gapi } from "gapi-script";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
// import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
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

// const localizer = momentLocalizer(moment);

export const CalendarList: React.FC = () => {
  const [events, setEvents]: any = useState([]);

  const getEvents = (calendarID?: string, apiKey?: string) => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })

        .then(
          (response: any) => {
            let events = response.result.items;
            return events;
          },
          function (err: any) {
            return [false, err];
          }
        );
    }

    gapi.load("client", initiate);
  };

  useEffect(() => {
    const events = getEvents(calendarID, apiKey);
    setEvents(events);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <iframe
        title="Google Calendar"
        src="https://calendar.google.com/calendar/embed?src=0969543c2df32452ccd6b77776d1cd4aa17afc2234a0cd1a12f2477f41950d69%40group.calendar.google.com&ctz=Asia%2FHo_Chi_Minh"
        style={{ border: 0 }}
        width={800}
        height={600}
        frameBorder={0}
        scrolling="no"
      ></iframe>
      {/* <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      /> */}
      <FullCalendar
        // plugins={[dayGridPlugin]}
        // initialView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        // events={events}
      />
      <MuiList>
        {events !== undefined &&
          events.map((event: any) => (
            <ListItem>
              <ListItemText primary={event.summary} />
            </ListItem>
          ))}
      </MuiList>
    </Box>
  );
};

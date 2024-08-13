import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { localizer, getMessagesEN } from "../../helpers";
import { CalendarEvent, Navbar } from "../";
import { useState } from "react";

const events = [
    {
        title: "Birthday",
        notes: "Buy present",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#fafafa",
        user: {
            _id: "ABC123",
            name: "Mochi",
        },
    },
];

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "week"
    );

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#347CF7",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white",
        };

        return {
            style,
        };
    };

    const onSelect = (event) => {
        console.log({ click: event });
    };

    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
    };

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

    return (
        <>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 80px)" }}
                messages={getMessagesEN()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
        </>
    );
};

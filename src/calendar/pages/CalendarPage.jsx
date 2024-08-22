import { useState, useEffect } from "react";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { localizer, getMessagesEN } from "../../helpers";
import {
    CalendarEvent,
    CalendarModal,
    FabAddNew,
    FabDelete,
    Navbar,
} from "../";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadinEvents } = useCalendarStore();
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
        setActiveEvent(event);
    };

    const onDoubleClick = () => {
        openDateModal();
    };

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

    useEffect(() => {
        startLoadinEvents();
    }, []);

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

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    );
};

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { localizer } from "../../helpers";
import { Navbar } from "../";
import { getMessagesEN } from "../../helpers/getMessages";

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

    return (
        <>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 80px)" }}
                messages={getMessagesEN()}
                eventPropGetter={eventStyleGetter}
            />
        </>
    );
};

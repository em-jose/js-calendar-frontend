import { useDispatch, useSelector } from "react-redux";
import {
    onAddNewEvent,
    onDeleteEvent,
    onSetActiveEvent,
    onUpdateEvent,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { parseEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            const { data } = await calendarApi.post("/events", calendarEvent);

            dispatch(
                onAddNewEvent({ ...calendarEvent, id: data.event.id, user })
            );
        }
    };

    const startDeletingEvent = async () => {
        dispatch(onDeleteEvent());
    };

    const startLoadinEvents = async () => {
        try {
            const { data } = await calendarApi.get("/events");
            const events = parseEventsToDateEvents(data.events);

            console.log(events);
        } catch (error) {
            console.log("Loading events error");
            console.log(error);
        }
    };

    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Methods
        setActiveEvent,
        startDeletingEvent,
        startLoadinEvents,
        startSavingEvent,
    };
};

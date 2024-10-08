import { useDispatch, useSelector } from "react-redux";
import {
    onAddNewEvent,
    onDeleteEvent,
    onSetActiveEvent,
    onUpdateEvent,
    onLoadEvent,
} from "../store/";
import calendarApi from "../api/calendarApi";
import { parseEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                await calendarApi.put(
                    `/events/${calendarEvent.id}`,
                    calendarEvent
                );

                dispatch(onUpdateEvent({ ...calendarEvent, user }));

                return;
            }

            const { data } = await calendarApi.post("/events", calendarEvent);

            dispatch(
                onAddNewEvent({ ...calendarEvent, id: data.event.id, user })
            );
        } catch (error) {
            console.log(error);
            Swal.fire("Error on saving", error.response.data?.msg, "error");
        }
    };

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);

            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire("Error on deleting", error.response.data?.msg, "error");
        }
    };

    const startLoadingEvents = async () => {
        if (!("token" in localStorage)) return;

        try {
            const { data } = await calendarApi.get("/events");
            const events = parseEventsToDateEvents(data.events);

            dispatch(onLoadEvent(events));
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
        startLoadingEvents,
        startSavingEvent,
    };
};

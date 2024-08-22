import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        isLoading: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => {
                if (event._id === payload._id) return payload;

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(
                    (event) => event._id !== state.activeEvent._id
                );
                state.activeEvent = null;
            }
        },
        onLoadEvent: (state, { payload = [] }) => {
            state.isLoading = false;
            payload.forEach((event) => {
                const exists = state.events.some(
                    (dbEvent) => dbEvent.id === event.id
                );

                if (!exists) state.events.push(event);
            });
        },
    },
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvent,
} = calendarSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

import { addHours } from "date-fns";

const tempEvent = {
    title: "Birthday",
    notes: "Buy present",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
        _id: "ABC123",
        name: "Mochi",
    },
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [tempEvent],
        activeEvent: null,
    },
    reducers: {
        increment: (state) => {
            state.counter += 1;
        },
    },
});

export const { increment } = calendarSlice.actions;

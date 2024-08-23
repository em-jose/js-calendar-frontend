export const events = [
    {
        id: "1",
        title: "Cat`s birthday!",
        start: new Date("2023-10-21 13:00:00"),
        end: new Date("2024-10-21 16:00:00"),
        notes: "Buy present",
    },
    {
        id: "2",
        title: "Dog`s birthday!",
        start: new Date("2023-05-15 13:00:00"),
        end: new Date("2024-05-15 16:00:00"),
        notes: "Note",
    },
];

export const initialState = {
    isLoading: true,
    events: [],
    activeEvent: null,
};

export const calendarWithEventsState = {
    isLoading: false,
    events: [...events],
    activeEvent: null,
};

export const calendarWithActiveEventState = {
    isLoading: false,
    events: [...events],
    activeEvent: { ...events[0] },
};

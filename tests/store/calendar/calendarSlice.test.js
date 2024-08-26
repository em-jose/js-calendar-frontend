import {
    calendarSlice,
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvent,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
    calendarWithActiveEventState,
    calendarWithEventsState,
    events,
    initialState,
} from "../../fixtures/calendarStates";

describe("Tests over calendarSlice", () => {
    test("should return initial state", () => {
        const state = calendarSlice.getInitialState();

        expect(state).toEqual(initialState);
    });

    test("onSetActiveEvent should active event", () => {
        const state = calendarSlice.reducer(
            calendarWithEventsState,
            onSetActiveEvent(events[0])
        );

        expect(state.activeEvent).toEqual(events[0]);
    });

    test("onAddNewEvent should add event", () => {
        const newEvent = {
            id: "3",
            title: "Bird`s birthday!",
            start: new Date("2023-02-05 13:00:00"),
            end: new Date("2024-02-05 16:00:00"),
            notes: "Buy another present",
        };

        const state = calendarSlice.reducer(
            calendarWithEventsState,
            onAddNewEvent(newEvent)
        );

        expect(state.events).toEqual([...events, newEvent]);
    });

    test("onUpdateEvent should update event", () => {
        const updatedEvent = {
            id: "1",
            title: "Dragon`s birthday!",
            start: new Date("2023-09-19 13:00:00"),
            end: new Date("2024-09-19 16:00:00"),
            notes: "Buy a big present",
        };

        const state = calendarSlice.reducer(
            calendarWithEventsState,
            onUpdateEvent(updatedEvent)
        );

        expect(state.events).toContain(updatedEvent);
    });

    test("onDeleteEvent should delete event and activeEvent", () => {
        const state = calendarSlice.reducer(
            calendarWithActiveEventState,
            onDeleteEvent()
        );

        expect(state.events).not.toContain(events[0]);
        expect(state.activeEvent).toBeNull();
    });

    test("onLoadEvent should set events", () => {
        const state = calendarSlice.reducer(initialState, onLoadEvent(events));

        expect(state.isLoading).toBe(false);
        expect(state.events).toEqual(events);
    });

    test("onLogoutCalendar should clear state", () => {
        const state = calendarSlice.reducer(
            calendarWithActiveEventState,
            onLogoutCalendar()
        );

        expect(state).toEqual(initialState);
    });
});

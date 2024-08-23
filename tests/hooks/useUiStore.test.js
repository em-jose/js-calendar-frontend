const { Provider } = require("react-redux");
const { renderHook } = require("@testing-library/react");
const { configureStore } = require("@reduxjs/toolkit");
const { useUiStore } = require("../../src/hooks/useUiStore");
const { uiSlice } = require("../../src/store");
const { act } = require("@testing-library/react");

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState },
        },
    });
};

describe("Tests over useUiStore", () => {
    test("should return initial values", () => {
        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        });
    });

    test("openDateModal modal should set true in isDateModalOpen", () => {
        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();
    });

    test("closeDateModal should set false in isDateModalOpen", () => {
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        act(() => {
            result.current.closeDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
    });

    test("toggleDateModal should toggle the state", () => {
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        act(() => {
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();

        act(() => {
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();
    });
});

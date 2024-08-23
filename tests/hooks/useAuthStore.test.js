import { Provider } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState },
        },
    });
};

describe("Tests over useAuthStore", () => {
    test("should return initial values", () => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        expect(result.current).toEqual({
            status: "checking",
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        });
    });

    test("startLogin should do login", async () => {
        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: {
                name: "Test",
                uid: "667e8823b0c2f3cd760ff24a",
            },
        });

        expect(localStorage.getItem("token")).toEqual(expect.any(String));
        expect(localStorage.getItem("token-init-date")).toEqual(
            expect.any(String)
        );
    });

    test("startLogin should fail authentication", async () => {
        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startLogin({
                email: "test@test.com",
                password: "654321",
            });
        });

        const { errorMessage, status, user } = result.current;

        expect(localStorage.getItem("token")).toBeNull();
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: "Wrong credentials",
            status: "not-authenticated",
            user: {},
        });

        await waitFor(() =>
            expect(result.current.errorMessage).toBeUndefined()
        );
    });
});

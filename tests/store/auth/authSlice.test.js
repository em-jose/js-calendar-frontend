import {
    authSlice,
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Tests over authSlice", () => {
    test("should return initial state", () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test("should do login", () => {
        const state = authSlice.reducer(
            initialState,
            onLogin(testUserCredentials)
        );

        expect(state).toEqual({
            status: "authenticated",
            user: testUserCredentials,
            errorMessage: undefined,
        });
    });

    test("should do logout", () => {
        const state = authSlice.reducer(authenticatedState, onLogout());

        expect(state).toEqual({
            status: "not-authenticated",
            user: {},
            errorMessage: undefined,
        });
    });

    test("should do logout with message", () => {
        const errorMessage = "Not valid credentials";
        const state = authSlice.reducer(
            authenticatedState,
            onLogout(errorMessage)
        );

        expect(state).toEqual({
            status: "not-authenticated",
            user: {},
            errorMessage: errorMessage,
        });
    });

    test("should clear error message", () => {
        const errorMessage = "Not valid credentials";
        const state = authSlice.reducer(
            authenticatedState,
            onLogout(errorMessage)
        );
        const newState = authSlice.reducer(state, clearErrorMessage());

        expect(newState.errorMessage).toBe(undefined);
    });

    test("should do checking", () => {
        const state = authSlice.reducer(
            authenticatedState,
            onLogin(testUserCredentials)
        );
        const newState = authSlice.reducer(state, onChecking());

        expect(newState).toEqual({
            status: "checking",
            user: {},
            errorMessage: undefined,
        });
    });
});

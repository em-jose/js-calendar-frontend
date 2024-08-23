import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authStates";

describe("Tests over authSlice", () => {
    test("should return initial state", () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });
});

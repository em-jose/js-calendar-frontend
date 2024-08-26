import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";

jest.mock("../../src/hooks/useAuthStore");

describe("Tests over <AppRouter />", () => {
    const mockCheckAuthToken = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should show loading screen and call checkAuthToken", () => {
        useAuthStore.mockReturnValue({
            status: "checking",
            checkAuthToken: mockCheckAuthToken,
        });

        render(<AppRouter />);

        expect(screen.getByText("Loading...")).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });
});

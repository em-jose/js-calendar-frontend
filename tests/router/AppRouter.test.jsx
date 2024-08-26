import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
    CalendarPage: () => <h1>CalendarPage</h1>,
}));

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

    test("should show login if user is not authenticated", () => {
        useAuthStore.mockReturnValue({
            status: "not-authenticated",
            checkAuthToken: mockCheckAuthToken,
        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getAllByText("Login")).toBeTruthy();
        expect(screen.getByText("Register")).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    test("should show calendar if user is authenticated", () => {
        useAuthStore.mockReturnValue({
            status: "authenticated",
            checkAuthToken: mockCheckAuthToken,
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByText("CalendarPage")).toBeTruthy();
    });
});

import calendarApi from "../../src/api/calendarApi";

describe("Tests over calendarApi", () => {
    test("Should have default config", () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    test("Should have x-token in header", async () => {
        const token = "ABC-123-XYZ";

        localStorage.setItem("token", token);

        const res = await calendarApi
            .get("/auth")
            .then((res) => res)
            .catch((res) => res);

        expect(res.config.headers["x-token"]).toBe(token);
    });
});

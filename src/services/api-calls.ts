export async function getData() {
    try {
        const res = await fetch(import.meta.env.VITE_GOOGLE_SHEET_WEB_APP_URL);
        const data = await res.json();
        if (!data.data) {
            throw new Error("data not received");
        }

        return data.data;
    } catch (err) {
        return null;
    }
}

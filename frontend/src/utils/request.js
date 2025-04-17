async function request (url, options) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const baseUrl = "http://localhost:4000";
    const req = await fetch(baseUrl + "/" + url, {
        method: options?.method || "GET",
        body: options?.body ? JSON.stringify(options.body) : null,
        headers: {
            'Content-type': "application/json",
            authorization: "bearer " + user?.token,
        }
    });
    const data = await req.json();
    return data;
}

export default request;
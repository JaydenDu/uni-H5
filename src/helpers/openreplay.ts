import Tracker from "@openreplay/tracker";
import {RequestResponseData} from "@openreplay/tracker/lib/modules/network";

const VER = import.meta.env.VITE_VER || "dev";
export const tracker = new Tracker({
    projectKey: import.meta.env.VITE_OPENREPLAY_KEY,
    ingestPoint: "https://openreplay.bee.com/ingest",
    network: {
        sessionTokenHeader: false,
        failuresOnly: false,
        ignoreHeaders: ["Cookie", "Set-Cookie", "Authorization"],
        capturePayload: true,
        captureInIframes: true,
        sanitizer: (data: RequestResponseData) => { // sanitise the body or headers
            // Sanitize response
            try {
                const dataString = JSON.stringify(data.response.body);
                let newDataString = dataString;

                function replaceString(key: string) {
                    newDataString = newDataString.replace(new RegExp(`"${key}":"[0-9]+"`, "g"), `"${key}":"####"`)
                }

                replaceString("jwt");
                replaceString("cvv");
                replaceString("cardNo");
                replaceString("phoneNumber");
                replaceString("ercAddress");
                replaceString("trcAddress");
                replaceString("token");
                if (newDataString != dataString) {
                    data.response.body = JSON.parse(newDataString);
                    // console.log(newDataString);
                } else {
                    // console.log("nochane", data.url, dataString);
                }
                return data;
            } catch (e) {
                // pass
            }
            return data;
        }
    },
});
const email = localStorage.getItem("email");
if (email) {
    tracker.start({
        userID: email,
        metadata: {
            email: email,
            ver: VER,
        },
    });
} else {
    tracker.start({
        metadata: {
            ver: VER,
        }
    });
}

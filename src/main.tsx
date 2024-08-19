import { render } from "preact";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "@unocss/reset/tailwind-compat.css";
import "./index.css";
import "./antd.css";
import App from "./App.js";
import "./helpers/openreplay.js";
import { initializeApi } from "@/helpers/api";

const loginCallbackJwt = () => {
  const jwt = new URLSearchParams(location.search).get("jwt");
  if (jwt) {
    initializeApi(jwt);
    history.replaceState({ jwt: "" }, "", location.pathname);
  }
};

loginCallbackJwt();

render(<App />, document.getElementById("app") as HTMLElement);

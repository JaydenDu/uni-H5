import { RouterProvider } from "react-router-dom";
import routes from "./router/index.js";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;

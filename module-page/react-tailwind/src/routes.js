import Servers from "./screens/pages/servers.jsx";
import ServerId from "./screens/pages/serverId.jsx";

export const routes = [
  {
    path: "/",
    Component: Servers,
  },
  {
    path: "/:serverId",
    Component: ServerId,
  },
];

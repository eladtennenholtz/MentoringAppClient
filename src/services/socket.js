import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "mentoringappserver-production.up.railway.app"
    : "http://localhost:3001";

export const socket = io("mentoringappserver-production.up.railway.app");

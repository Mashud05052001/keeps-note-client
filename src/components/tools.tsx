import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://keeps-note-server.vercel.app/api",
});

export const queryClient = new QueryClient();

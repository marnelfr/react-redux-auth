import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
  prepareHeaders: (headers: Headers, api: Pick<BaseQueryApi, "getState">) => {
    const state = api.getState() as RootState;
    if (state.auth.token) {
      headers.set("Authorization", `Bearer ${state.auth.token}`);
    }
    return headers;
  },
});

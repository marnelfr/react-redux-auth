import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { authActions } from "../../features/auth/slices/authSlice";

interface RefreshTokenDataType {
  token: string;
  user: any;
}

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

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  let response = await baseQuery(args, api, extraOptions);
  console.log({ "response?.error?.status": response?.error?.status });

  if (response?.error?.status === 401) {
    const refreshedToken = await baseQuery("/token/refresh", api, extraOptions);
    console.log(refreshedToken);
    if (refreshedToken?.data) {
      const data = refreshedToken.data as RefreshTokenDataType;
      const state = api.getState() as RootState;
      api.dispatch(
        authActions.setCredentials({ token: data.token, user: state.auth.user })
      );
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.logout());
    }
  }

  return response;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});

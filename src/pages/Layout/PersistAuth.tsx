import { useEffect, useState } from "react";
import { baseQueryWithReAuth } from "../../app/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Outlet } from "react-router-dom";
import { authActions } from "../../features/auth/slices/authSlice";

const PersistAuthLayout = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const token = state.auth.token;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      const controller = new AbortController();
      const response: any = await baseQueryWithReAuth(
        "/token/refresh",
        {
          abort(reason: string | undefined): void {},
          dispatch,
          endpoint: "",
          extra: undefined,
          getState(): unknown {
            return state;
          },
          signal: controller.signal,
          type: "mutation",
        },
        null
      );
      if (response?.data?.token !== undefined) {
        authActions.setCredentials(response.data);
      }
      setIsLoading(false);
    };
    !token ? refresh() : setIsLoading(false);
  });

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistAuthLayout;

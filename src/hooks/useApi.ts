import { useEffect, useMemo } from "react";
import { message } from "antd";

import { apiService } from "../services";
import useAuthContext from "./useAuthContext";
import { PaginatedDocuments } from "../types";

export default function useApi() {
  const { token, onAuthenticated, onLogout } = useAuthContext();

  useEffect(() => {
    apiService.setOauthToken(token);
  }, [token]);

  const api = useMemo(() => {
    return {
      ...apiService,
      async oauth(code: string, state: string): Promise<string> {
        try {
          const res = await apiService.oauth(code, state);
          onAuthenticated(res);
          apiService.setOauthToken(res.oauthToken);
          return res.email;
        } catch (err) {
          onLogout();
          message.error(err.message);
          return "";
        }
      },
      listDocuments: with401Handler(apiService.listDocuments),
      createAndSend: with401Handler(apiService.createAndSend),
    };

    function with401Handler<T>(fn: T): T {
      const wrapped: any = async (...args: any[]) => {
        try {
          const res = await (fn as any)(...args);
          return res;
        } catch (err) {
          if (err?.response?.status === 401) {
            onLogout();
            message.error("Your session has expired. Please log in again.");
          } else {
            message.error(err.message);
          }
          return {} as PaginatedDocuments;
        }
      };

      return wrapped as T;
    }
  }, [onAuthenticated, onLogout]);

  return api;
}

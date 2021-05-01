import { useEffect } from "react";
import { message } from "antd";

import { apiService } from "../services";
import useAuthContext from "./useAuthContext";
import { PaginatedDocuments } from "../types";

export default function useApi() {
  const { token, onAuthenticated, onLogout } = useAuthContext();

  useEffect(() => {
    apiService.setOauthToken(token);
  }, [token]);

  const api = {
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
    async listDocuments(
      page: number,
      pageSize: number
    ): Promise<PaginatedDocuments> {
      try {
        const res = await apiService.listDocuments(page, pageSize);
        return res;
      } catch (err) {
        onLogout();
        message.error(err.message);
        return {} as PaginatedDocuments;
      }
    },
  };

  return api;
}

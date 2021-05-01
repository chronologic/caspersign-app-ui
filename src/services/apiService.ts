import axios from "axios";

import { API_URL } from "../env";
import { IUser, PaginatedDocuments } from "../types";

const client = axios.create({
  baseURL: API_URL,
});

let oauthToken = "";

const api = {
  setOauthToken(token: string): void {
    oauthToken = token;
  },
  async oauth(code: string, state: string): Promise<IUser> {
    const { data } = await client.post(`/users/oauth`, { code, state });

    return data;
  },
  async listDocuments(
    page: number,
    pageSize: number
  ): Promise<PaginatedDocuments> {
    const { data } = await client.get(
      `/documents?page=${page}&pageSize=${pageSize}`,
      {
        headers: getAuthHeader(),
      }
    );

    return data;
  },
};

function getAuthHeader(): { Authorization: string } {
  return { Authorization: `Bearer ${oauthToken}` };
}

export default api;

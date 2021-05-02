import axios from "axios";

import { API_URL } from "../env";
import { DocumentUploadFormData, IUser, PaginatedDocuments } from "../types";

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
  async createAndSend(form: DocumentUploadFormData): Promise<any> {
    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("title", form.title);
    formData.append("message", form.message || "");
    form.signers.forEach((signer) => {
      formData.append("signers[]", JSON.stringify(signer));
    });

    const { data } = await client.post(`/documents`, formData, {
      headers: getAuthHeader(),
    });

    return data;
  },
};

function getAuthHeader(): { Authorization: string } {
  return { Authorization: `Bearer ${oauthToken}` };
}

export default api;

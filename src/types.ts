export interface IUser {
  email: string;
  oauthToken: string;
}

export enum DocumentStatus {
  OUT_FOR_SIGNATURE = "OUT_FOR_SIGNATURE",
  AWAITING_MY_SIGNATURE = "AWAITING_MY_SIGNATURE",
  COMPLETED = "COMPLETED",
  DECLINED = "DECLINED",
}

export interface PaginatedDocuments {
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  items: DocumentSummary[];
}

export interface DocumentSummary {
  documentUid: string;
  title: string;
  status: DocumentStatus;
  createdAt: string;
  signatures: SignatureSummary[];
}

export interface SignatureSummary {
  signatureUid: string;
  ip: string;
  email: string;
  name: string;
  completed: boolean;
  payload?: string;
  txHash: string;
  signedAt: string;
}

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
  meta: PaginationMeta;
  items: DocumentSummary[];
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
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

export interface DocumentUploadFormData {
  file: File;
  title: string;
  message?: string;
  signers: {
    name: string;
    email_address: string;
  }[];
}

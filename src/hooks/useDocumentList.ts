import { useState, useEffect, useCallback } from "react";

import { DocumentSummary, PaginatedDocuments, PaginationMeta } from "../types";
import useApi from "./useApi";

interface IDocumentList extends PaginatedDocuments {
  loading: boolean;
  onPaginationChange: (
    config: Pick<PaginationMeta, "page" | "pageSize">
  ) => void;
}

const CONFIG_STORAGE_KEY = "documentListCfg";
const DEFAULT_PAGE_SIZE = 25;

function useDocumentList(config?: Partial<PaginationMeta>): IDocumentList {
  const { listDocuments } = useApi();
  const [items, setItems] = useState<DocumentSummary[]>([]);
  const [page, setPage] = useState(config?.page || 1);
  const [pageSize, setPageSize] = useState(
    config?.pageSize || DEFAULT_PAGE_SIZE
  );
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const restoreConfig = useCallback((): PaginationMeta => {
    const {
      page: storedPage = 1,
      pageSize: storedPageSize = DEFAULT_PAGE_SIZE,
    } = JSON.parse(
      localStorage.getItem(CONFIG_STORAGE_KEY) || "{}"
    ) as PaginationMeta;
    setPage(storedPage);
    setPageSize(storedPageSize);

    return { page: storedPage, pageSize: storedPageSize, total: 0 };
  }, []);

  const storeConfig = useCallback((params: Partial<PaginationMeta>) => {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(params));
  }, []);

  const fetchData = useCallback(
    async (params: Pick<PaginationMeta, "page" | "pageSize">) => {
      setLoading(true);
      setPage(params.page);
      setPageSize(params.pageSize);
      storeConfig(params);
      try {
        const res = await listDocuments(params.page, params.pageSize);
        setItems(res.items);
        setTotal(res.meta.total);
      } finally {
        setLoading(false);
      }
    },
    [listDocuments, storeConfig]
  );

  useEffect(() => {
    const cfg = restoreConfig();
    fetchData(cfg);
    // only run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restoreConfig]);

  return {
    loading,
    items,
    meta: {
      page,
      pageSize,
      total,
    },
    onPaginationChange: fetchData,
  };
}

export default useDocumentList;

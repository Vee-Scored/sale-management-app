import { create } from "zustand";

export const usePaginationStore = create((set) => ({
  url: "https://voucher-app-auth-api.ygnsh.com/api/v1/products?limit=5&page=1",
  setUrl: (path) => set({ url: path }),

  metaPathData: {},
  setMetaPathData: (data) => set({ metaPathData: data }),
  paginationLinks: {},
  setPaginationLinks: (links) => set({ paginationLinks: links })
}));

import { create } from "zustand";

interface FilterState {
  name?: string;
  category?: string;
  sortBy?: string;
  setFilter: (filter: FilterState) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  name: "",
  category: "",
  sortBy: "",
  setFilter: (filter) => set(filter),
}));

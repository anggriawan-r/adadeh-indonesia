import { create } from "zustand";

interface SetFilterState {
  name?: string;
  category?: string;
  sortBy?: string;
}

interface FilterState {
  name?: string;
  category?: string | null;
  sortBy?: string;
  setFilter: (filter: SetFilterState) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  name: "",
  category: "",
  sortBy: "",
  setFilter: (filter) => set(filter),
}));

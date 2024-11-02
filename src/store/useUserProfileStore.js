import { create } from "zustand";

export const useUserProfileStore = create((set) => ({
    profile : {},
    setProfile : (profile) => set ({profile : profile})
}))
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setStore: (user: any, accessToken: string, refreshToken: string) => void;
  clearStore: () => void;
}

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStore: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      clearStore: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-store",
    },
  ),
);

export default useAuthStore;
//

//
//
//
//

///

//

//   setUser: (user: any) => set({ user }),
//   setAccessToken: (accessToken: string) => set({ accessToken }),
//   setRefreshToken: (refreshToken: string) => set({ refreshToken }),
//   setIsAuthenticated: (isAuthenticated: boolean) =>
//     set({ isAuthenticated }),

export type LoginMode = "viewer" | "editor" | null;

const LOGIN_MODE_KEY = "login_mode";

export const getLoginMode = (): LoginMode => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LOGIN_MODE_KEY) as LoginMode;
};

export const setLoginMode = (mode: LoginMode) => {
  if (typeof window !== "undefined" && mode) {
    localStorage.setItem(LOGIN_MODE_KEY, mode);
  }
};

export const clearLoginMode = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOGIN_MODE_KEY);
  }
};

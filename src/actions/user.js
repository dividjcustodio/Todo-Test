import { CHANGE_USER_DATA } from "./types";

export const signInAction = data => {
  window.sessionStorage.setItem("user", JSON.stringify(data));

  return {
    data: { ...data, isAuthenticated: true },
    type: CHANGE_USER_DATA
  };
};

export const logout = (data, history) => {
  window.sessionStorage.setItem("user", "");

  return {
    data: { name: "", password: "", isAuthenticated: false },
    type: CHANGE_USER_DATA
  };
};

export const logout = (navigate) => {
  localStorage.clear();
  window.location.href = "/";
};

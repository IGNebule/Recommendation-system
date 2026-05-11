export const checkAuth = () => {
  const token = localStorage.getItem("token");

  return !!token;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

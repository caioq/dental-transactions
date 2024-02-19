export const getUserData = () => {
  const user = localStorage.getItem("@DT:user");
  return user ? JSON.parse(user) : null;
};

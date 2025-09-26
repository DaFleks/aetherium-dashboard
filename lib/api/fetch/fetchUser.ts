export const getAllUsers = async () => {};

export const addUser = async (formData: FormData) => {
  const response = await fetch("/api/users", { method: "POST", body: formData });
};

export const deleteUser = async (id: string) => {
  console.log(id);
  const response = await fetch("/api/users", { method: "DELETE", body: JSON.stringify({ id: id }) });
  const data = await response.json();
  return 0;
};

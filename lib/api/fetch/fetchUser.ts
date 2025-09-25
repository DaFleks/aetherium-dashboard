export const addUser = async (formData: FormData) => {
  const response = await fetch("/api/users", { method: "POST", body: formData });
  const data = await response.json();
  return { ...data };
};

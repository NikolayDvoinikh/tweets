import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://63fbaaf31ff79e133292e0ae.mockapi.io",
});

const apiLayout = async (
  foo: (data?: any) => Promise<TwitterUser | TwitterUser[]>,
  data?: InfoToUpdate
) => {
  try {
    return await foo(data);
  } catch (e) {
    console.error("Error happened:", e);
  }
};

const getUsers = async () => {
  const { data }: AxiosResponse<TwitterUser[]> = await api.get("/users");
  return data;
};

const updateFollowStatus = async ({ id, followers }: InfoToUpdate) => {
  const { data: updatedStatus }: AxiosResponse<TwitterUser> = await api.put(
    `/users/${id}`,
    { followers }
  );
  return updatedStatus;
};

export { getUsers, updateFollowStatus, apiLayout };

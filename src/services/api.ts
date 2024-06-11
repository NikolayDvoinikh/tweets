import axios, { AxiosResponse } from "axios";
import { TwitterUser } from "../components/Tweet";

const api = axios.create({
  baseURL: "https://63fbaaf31ff79e133292e0ae.mockapi.io",
});

const apiLayout = async <T>(
  foo: (
    data?: TwitterUser | Pick<TwitterUser, "followers" | "id" | "avatar"> | null
  ) => Promise<T>,
  data?: TwitterUser | Pick<TwitterUser, "followers" | "id" | "avatar"> | null
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

const updateFollowStatus = async ({
  id,
  followers,
}: {
  id: TwitterUser["id"];
  followers: TwitterUser["followers"];
}) => {
  const { data: updatedStatus }: AxiosResponse<TwitterUser> = await api.put(
    `/users/${id}`,
    { followers }
  );
  return updatedStatus;
};

export { getUsers, updateFollowStatus, apiLayout };

import axios, { AxiosResponse } from "axios";
import { TwitterUser } from "../components/Tweet";

const api = axios.create({
  baseURL: "https://63fbaaf31ff79e133292e0ae.mockap.io",
});

// const apiLayout = async <T>(foo: () => Promise<T>) => {
//   try {
//     return await foo();
//   } catch (e) {
//     console.error("Error happened:", e);
//   }
// };
const getUsers = async () => {
  try {
    const response: AxiosResponse<TwitterUser[]> = await api.get("/users");
    // console.log(response.data);
    return response.data;
  } catch (e) {
    console.error("Error happened:", e);
  }
};

export default getUsers;

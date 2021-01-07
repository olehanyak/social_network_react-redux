
import { UsersType } from "../types/types";
import { instance, APIResponseType } from "./api";

type UsersResponseType = {
  items: Array<UsersType>
  totalCount: number
  error: string | null
}

export const dataAPI = {
  getUsers(currentPage = 1, sizePage = 10) {
    return instance.get<UsersResponseType>(`users?page=${currentPage}&limit=${sizePage}`)
      .then(response => response.data)
  },
  getUsersPage(page = 1, sizePage = 10) {
    return instance.get<UsersResponseType>(`users?page=${page}&limit=${sizePage}`)
      .then(response => response.data)
  },
  unFollowUser(userId: number) {
    return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<ResponseType>
  },
  followUser(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`)
      .then(response => response.data.data)
  },
};


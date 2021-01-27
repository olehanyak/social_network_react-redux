
import { UsersType } from "../types/types";
import { instance, APIResponseType } from "./api";

type UsersResponseType = {
  items: Array<UsersType>
  totalCount: number
  error: string | null
}

export const dataAPI = {
  getUsers(currentPage = 1, sizePage = 10, term: string = "", friend: null | boolean = null) {
    return instance.get<UsersResponseType>(`users?page=${currentPage}&limit=${sizePage}&term=${term}` + (friend === null ? "" : `&friend${friend}`))
      .then(response => response.data)
  },
  getUsersPage(page = 1, sizePage = 10) {
    return instance.get<UsersResponseType>(`users?page=${page}&limit=${sizePage}`)
      .then(response => response.data)
  },
  unFollowUser(userId: number) {
    return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
  },
  followUser(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`)
      .then(response => response.data.data) as Promise<APIResponseType>
  },
};


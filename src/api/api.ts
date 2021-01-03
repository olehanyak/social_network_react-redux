import axios from "axios"
import { UserProfileType, UsersType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "afe69b04-1a5d-482c-b3b5-bc6a936dfde9",
  },
})

type UsersResponseType = {
  items: Array<UsersType>
  totalCount: number
  error: string | null
}

type FollowUserResponseType = {
  data: LoginUserResponseType
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
    return instance.delete(`unfollow/${userId}`)
      .then(response => response.data)
  },
  followUser(userId: number) {
    return instance.post<FollowUserResponseType>(`follow/${userId}`)
      .then(response => response.data.data)
  },
  // profileUser(userId: number) {
  //   return instance.get(`profile/${userId}`)
  //     .then(response => response.data)
  // },
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

type LoginUserResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
  },
  loginUser(email: string, password: number, rememberMe: boolean) {
    return instance.post<LoginUserResponseType>(`auth/login`, { email, password, rememberMe })
      .then(res => res.data)
  },
  logoutUser() {
    return instance.delete(`auth/login`);
  },
};

type ProfileUserResponseType = {
  data: UserProfileType
}

type UpdateProfileStatusUserType = {
  data: MeResponseType
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileUserResponseType>(`profile/${userId}`).then(response => response.data.data)
  },
  getProfileStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },
  updateProfileStatus(status: string) {
    return instance.put<UpdateProfileStatusUserType>(`profile/status/`, { status: status })
      .then(res => res.data.data)
  },
};
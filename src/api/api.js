import * as axios from "axios"

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "afe69b04-1a5d-482c-b3b5-bc6a936dfde9",
  },
})

export const dataAPI = {
  getUsers(currentPage = 1, sizePage = 10) {
    return instance.get(`users?page=${currentPage}&limit=${sizePage}`)
      .then(response => response.data)
  },
  getUsersPage(page = 1, sizePage = 10) {
    return instance.get(`users?page=${page}&limit=${sizePage}`)
      .then(response => response.data)
  },
  unFollowUser(user) {
    return instance.delete(`follow/${user.id}`)
      .then(response => response.data)
  },
  followUser(user) {
    return instance.post(`follow/${user.id}`)
      .then(response => response.data)
  },
  authUser() {
    return instance.get(`auth/me`)
      .then(response => response.data)
  },
  profileUser(userId) {
    return instance.get(`profile/${userId}`)
      .then(response => response.data)
  },
};
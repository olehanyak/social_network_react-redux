
import { instance, APIResponseType } from "./api";

export type MeResponseType = {
  id: number
  email: string
  login: string
}

export type LoginUserResponseType = {
  userId: number
}

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeResponseType>>(`auth/me`).then(res => res.data)
  },
  loginUser(email: string, password: string, rememberMe: boolean, captcha: string) {
    return instance.post<APIResponseType<LoginUserResponseType>>(`auth/login`, { email, password, rememberMe, captcha })
      .then(res => res.data)
  },
  logoutUser() {
    return instance.delete(`auth/login`);
  },
};



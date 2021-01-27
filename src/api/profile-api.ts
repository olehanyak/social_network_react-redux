
import { UserProfileType } from "../types/types";
import { instance } from "./api";

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

type UpdateProfileStatusUserType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<UserProfileType>(`profile/${userId}`).then(response => response.data)
  },
  getProfileStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then(res => res)
  },
  updateProfileStatus(status: string) {
    return instance.put<UpdateProfileStatusUserType>(`profile/status/`, { status: status })
      .then(res => res.data)
  },
  updateProfilePhoto(photoFile: string) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  }
};
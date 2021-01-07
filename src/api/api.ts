import axios from "axios"
import { UsersType } from "../types/types"

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "afe69b04-1a5d-482c-b3b5-bc6a936dfde9",
  },
})

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export type GetItemsType = {
  users: UsersType
  totalCount: number
  error: string | null
}
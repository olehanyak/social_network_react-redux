export type PostType = {
  id: number
  message: string
  like: number
}

export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type PhotosType = {
  small: string | undefined// maybe need null
  large: string | undefined
}

export type UserProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  aboutMe: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
}

export type UsersType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}
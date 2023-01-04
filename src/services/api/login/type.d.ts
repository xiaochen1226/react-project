export interface IUserLoginReq {
    name: string
    password: string
}

interface IUserLoginData {
    id: number
    name: string
    token: string
}

export interface IUserLoginRes {
    data?: IUserLoginData
    status: number
    msg: string
}

export interface IUserRegisterReq {
    name: string
    password: string
    nickname: string
}

export type IUserRegisterAvatarReq = FormData

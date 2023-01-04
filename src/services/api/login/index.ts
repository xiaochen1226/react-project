import request from '../../request'
import {
  IUserLoginReq,
  IUserRegisterReq,
  IUserRegisterAvatarReq,
  IUserLoginRes
} from './type'

export async function userLogin(data: IUserLoginReq): Promise<IUserLoginRes> {
  return request({
    url: '/merchant/login',
    method: 'POST',
    data
  })
}

export async function userRegister(data: IUserRegisterReq): Promise<IUserLoginRes> {
  return request({
    url: '/merchant/register',
    method: 'POST',
    data
  })
}

export async function userRegisterAvatar(data: IUserRegisterAvatarReq): Promise<IUserLoginRes> {
  return request({
    url: '/upload/avatar',
    method: 'POST',
    data
  })
}

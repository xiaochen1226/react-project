import request from '../../request'
import {IBrand} from './type'

export async function getBrandListReq(): Promise<IBrand> {
  return request({
    url: '/brand',
    method: 'GET',
  })
}


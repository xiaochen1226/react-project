import request from '../../request'
import {ICate} from './type'

export async function getCateListReq(): Promise<ICate> {
  return request({
    url: '/cate',
    method: 'GET',
  })
}


import request from '../../request'
import { IProductReq,IProductRes,IPatchProduct } from './type'

export async function getProductList(params: IProductReq): Promise<IProductRes> {
  return request({
    url: '/product',
    method: 'GET',
    params
  })
}

export async function deleteMyProduct(id: number): Promise<IProductRes> {
  return request({
    url: `/product/delete/${id}`,
    method: 'DELETE',
  })
}

export async function createProduct(data: FormData): Promise<IProductRes>{
  return request({
    url: '/product/increment',
    method: 'POST',
    data
  })
}

export async function getProduct(id: string): Promise<IProductRes>{
  return request({
    url: `/product/id/${id}`,
    method: 'GET'
  })
}

export async function patchProduct(id: string,data: IPatchProduct): Promise<IProductRes>{
  return request({
    url: `/product/update/${id}`,
    method: 'PATCH',
    data
  })
}

export interface IProductReq {
    offset: number
    size: number,
    orderKey?: string
    orderRuler?: string
    is_sale?: number
}

export interface IProductRes {
  data?: Record<string, string|number>
  msg: string
  status: number
  total?: number
}

export interface IPatchProduct {
  brand_id: number
  cate_id: number
  content: string
  is_sale: number
  name: string
  original: number
  price: number
  summary:string
  tag: string
}

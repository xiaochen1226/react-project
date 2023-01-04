export interface IBrandData{
  id: number
  name: string
}

export interface IBrand {
  data: IBrandData[]
  total: number
  status: number
  msg: string
}

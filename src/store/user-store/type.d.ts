export interface IUserState {
  id: number
  name: string
  token: string
}

export interface IInitState {
  user: IUserState
}

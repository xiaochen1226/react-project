interface IMeta {
  icon?: React.ReactNode
  key: string
  label: React.ReactNode
}

export interface RouteObject {
  children?: RouteObject[]
  element?: React.ReactNode
  path?: string
  auth?: boolean
  meta?: IMeta
}

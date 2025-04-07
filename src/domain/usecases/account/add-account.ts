export namespace AddAccount {
  export type Params = {
    firstName: string
    lastName: string
    email: string
    roleId: number
    username: string
    avatar?: string
    passwordHash: string
  }
  export type Result = boolean
}

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Result>
}

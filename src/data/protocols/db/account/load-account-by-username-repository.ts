export interface LoadAccountByUsernameRepository {
  loadByUsername: (
    username: string,
  ) => Promise<LoadAccountByUsernameRepository.Result>
}

export namespace LoadAccountByUsernameRepository {
  export type Result = {
    id: string
    firstName: string
    lastName: string
    email: string
    roleId: number
    username: string
  }
}

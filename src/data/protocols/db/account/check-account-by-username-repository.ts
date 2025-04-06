export interface CheckAccountByUsernameRepository {
  checkByUsername: (
    username: string,
  ) => Promise<CheckAccountByUsernameRepository.Result>
}

export namespace CheckAccountByUsernameRepository {
  export type Result = boolean
}

export interface CheckAccountByUsername {
  check: (username: string) => Promise<boolean>
}

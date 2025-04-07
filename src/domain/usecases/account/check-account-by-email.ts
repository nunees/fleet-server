export interface CheckAccountByEmail {
  check: (email: string) => Promise<boolean>
}

export interface LoadAccountByEmail {
  load: (email: string) => Promise<boolean>
}

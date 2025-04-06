export interface LoadAccountByUsername {
  load: (username: string) => Promise<boolean>
}

export namespace LoadAccountByUsername {
  export type Result = boolean
}

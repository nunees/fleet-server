export interface CheckDriverByDocumentRepository {
  checkByDocument: (
    document: CheckDriverByDocumentRepository.Params,
  ) => Promise<CheckDriverByDocumentRepository.Result>
}

export namespace CheckDriverByDocumentRepository {
  export type Params = string
  export type Result = boolean
}

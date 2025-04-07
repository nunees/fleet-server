import { AddDriverRepository } from '@/data/protocols/db/driver/add-driver-repository'
import { CheckDriverByDocumentRepository } from '@/data/protocols/db/driver/check-driver-by-document'

export class AddDriverRepositorySpy implements AddDriverRepository {
  driver: AddDriverRepository.Params
  result = true

  async add(
    driver: AddDriverRepository.Params,
  ): Promise<AddDriverRepository.Result> {
    this.driver = driver
    return this.result
  }
}

export class CheckDriverByDocumentRepositorySpy
  implements CheckDriverByDocumentRepository
{
  document: string
  result = false

  async checkByDocument(
    document: string,
  ): Promise<CheckDriverByDocumentRepository.Result> {
    this.document = document
    return this.result
  }
}

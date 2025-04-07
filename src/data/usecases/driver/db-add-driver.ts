import { AddDriverRepository } from '@/data/protocols/db/driver/add-driver-repository'
import { CheckDriverByDocumentRepository } from '@/data/protocols/db/driver/check-driver-by-document'

export class DbAddDriver implements AddDriverRepository {
  constructor(
    private readonly addDriverRepository: AddDriverRepository,
    private readonly checkDriverByDocumentRepository: CheckDriverByDocumentRepository,
  ) {}

  async add(
    driver: AddDriverRepository.Params,
  ): Promise<AddDriverRepository.Result> {
    const documentExists =
      await this.checkDriverByDocumentRepository.checkByDocument(
        driver.documentNumber,
      )

    let isValid = false
    if (!documentExists) {
      isValid = await this.addDriverRepository.add(driver)
    }
    return isValid
  }
}

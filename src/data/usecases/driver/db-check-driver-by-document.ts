import { CheckDriverByDocumentRepository } from '@/data/protocols/db/driver/check-driver-by-document'

export class DbCheckDriverByDocument {
  constructor(
    private readonly checkDriverByDocumentRepository: CheckDriverByDocumentRepository,
  ) {}
  /**
   * @param document - The document to check.
   * @returns true if the document exists, false otherwise.
   */
  async check(document: string): Promise<boolean> {
    return await this.checkDriverByDocumentRepository.checkByDocument(document)
  }
}

import { AddDriverRepository } from '@/data/protocols/db/driver/add-driver-repository'

export class DbAddDriver implements AddDriverRepository {
  constructor(private readonly addDriverRepository: AddDriverRepository) {}

  async add(
    driver: AddDriverRepository.Params,
  ): Promise<AddDriverRepository.Result> {
    return await this.addDriverRepository.add(driver)
  }
}

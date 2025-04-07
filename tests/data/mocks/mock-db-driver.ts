import { AddDriverRepository } from '@/data/protocols/db/driver/add-driver-repository'

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

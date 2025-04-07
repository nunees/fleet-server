import { AddDriver } from '@/domain/usecases/driver/add-driver'

export interface AddDriverRepository {
  add: (
    driver: AddDriverRepository.Params,
  ) => Promise<AddDriverRepository.Result>
}

export namespace AddDriverRepository {
  export type Params = AddDriver.Params
  export type Result = boolean
}

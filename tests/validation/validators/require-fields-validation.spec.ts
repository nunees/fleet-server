import { RequiredFieldsValidation } from '@/validation/validators/required-fields-validation'
import { MissingParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'

const field = faker.word.noun()

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation(field)
}

describe('RequiredFields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ inputField: faker.word.noun() })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toBeFalsy()
  })
})

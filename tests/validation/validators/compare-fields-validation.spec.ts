import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'

const field = faker.word.noun()
const fieldToCompare = faker.word.noun()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  it('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'any_field',
      [fieldToCompare]: 'other_field',
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  it('Should not return if validation fails', () => {
    const sut = makeSut()
    const value = faker.word.noun()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    })
    expect(error).toBeFalsy()
  })
})

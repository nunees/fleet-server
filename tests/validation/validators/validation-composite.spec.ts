import { MissingParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'

const field = faker.word.noun()

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies,
  }
}

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toEqual(validationSpies[1].error)
  })

  it('Should return the first error if more than one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toEqual(validationSpies[0].error)
  })

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toBeFalsy()
  })
})

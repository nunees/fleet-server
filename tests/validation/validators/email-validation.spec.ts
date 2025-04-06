import { EmailValidation } from '@/validation/validators/email-validation'
import { EmailValidatorSpy } from '../mocks/mock-email-validator'
import { faker } from '@faker-js/faker'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/tests/domain/mocks/test-helpers'

type SutTypes = {
  sut: EmailValidation
  emailValidationSpy: EmailValidatorSpy
}

const field = faker.word.noun()

const makeSut = (): SutTypes => {
  const emailValidationSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidationSpy)
  return {
    sut,
    emailValidationSpy,
  }
}

describe('Email Validation', () => {
  it('Should return an error if EmailValidator return false', () => {
    const { sut, emailValidationSpy } = makeSut()
    emailValidationSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = sut.validate(email)
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidationSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [field]: email })
    expect(emailValidationSpy.email).toBe(email)
  })

  it('Should throw if EmailValidator throws', () => {
    const { sut, emailValidationSpy } = makeSut()
    jest.spyOn(emailValidationSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})

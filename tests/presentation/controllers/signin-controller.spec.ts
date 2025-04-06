import { SignInController } from '@/presentation/controllers/signin-controller'
import { faker } from '@faker-js/faker'
import { AuthenticationSpy, ValidationSpy } from '@/tests/presentation/mocks'
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks/test-helpers'
import { MissingParamError } from '@/presentation/errors'

const makeFakeRequest = (): SignInController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

type SutTypes = {
  sut: SignInController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignInController(authenticationSpy, validationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy,
  }
}

describe('SignIn Controller', () => {
  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password,
    })
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.result = null
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.result))
  })

  it('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.word.noun())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})

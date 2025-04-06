import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import {
  AddAccountRepositorySpy,
  CheckAccountByEmailRepositorySpy,
  CheckAccountByUsernameRepositorySpy,
} from '@/tests/data/mocks/mock-db-account'
import { HasherSpy } from '@/tests/data/mocks/mock-cryptography'
import { mockAddAccountParams } from '@/tests/domain/mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helpers'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  checkAccountByUsernameRepositorySpy: CheckAccountByUsernameRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const checkAccountByEmailRepositorySpy =
    new CheckAccountByEmailRepositorySpy()
  const checkAccountByUsernameRepositorySpy =
    new CheckAccountByUsernameRepositorySpy()
  const sut = new DbAddAccount(
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkAccountByUsernameRepositorySpy,
  )
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkAccountByUsernameRepositorySpy,
  }
}

describe('DbAddAdministrator Repository', () => {
  it('Should called AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const administratorParams = mockAddAccountParams()
    await sut.add(administratorParams)
    expect(addAccountRepositorySpy.account).toEqual({
      ...administratorParams,
      passwordHash: hasherSpy.digest,
    })
  })

  it('Should throw if AddAdministratorRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest
      .spyOn(addAccountRepositorySpy, 'add')
      .mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should called Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const administratorParams = mockAddAccountParams()
    await sut.add(administratorParams)
    expect(hasherSpy.plaintext).toBe(administratorParams.passwordHash)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return true on success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(mockAddAccountParams())
    expect(result).toBe(true)
  })

  it('Should return false if AddAdministratorRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = false
    const result = await sut.add(mockAddAccountParams())
    expect(result).toBe(false)
  })

  it('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const result = await sut.add(mockAddAccountParams())
    expect(result).toBe(false)
  })

  it('Should return false if CheckAdministratorByUsernameRepository returns true', async () => {
    const { sut, checkAccountByUsernameRepositorySpy } = makeSut()
    checkAccountByUsernameRepositorySpy.result = true
    const result = await sut.add(mockAddAccountParams())
    expect(result).toBe(false)
  })
})

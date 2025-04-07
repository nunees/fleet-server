import { mockAddDriverParams } from '@/tests/domain/mocks/mock-driver'
import { DbAddDriver } from '@/data/usecases/driver/db-add-driver'
import {
  AddDriverRepositorySpy,
  CheckDriverByDocumentRepositorySpy,
} from '@/tests/data/mocks/mock-db-driver'

type SutTypes = {
  sut: DbAddDriver
  addDriverRepositorySpy: AddDriverRepositorySpy
  checkDriverByDocumentRepositorySpy: CheckDriverByDocumentRepositorySpy
}

const makeSut = (): SutTypes => {
  const addDriverRepositorySpy = new AddDriverRepositorySpy()
  const checkDriverByDocumentRepositorySpy =
    new CheckDriverByDocumentRepositorySpy()
  const sut = new DbAddDriver(
    addDriverRepositorySpy,
    checkDriverByDocumentRepositorySpy,
  )
  return {
    sut,
    addDriverRepositorySpy,
    checkDriverByDocumentRepositorySpy,
  }
}

describe('DbAddDriver Usecase', () => {
  it('Should call AddDriverRepository with correct values', async () => {
    const { sut, addDriverRepositorySpy } = makeSut()
    const driverParams = mockAddDriverParams()
    await sut.add(driverParams)
    expect(addDriverRepositorySpy.driver).toEqual(driverParams)
  })

  it('Should throw if AddDriverRepository throws', async () => {
    const { sut, addDriverRepositorySpy } = makeSut()
    jest.spyOn(addDriverRepositorySpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddDriverParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return false if AddDriverRepository returns false', async () => {
    const { sut, addDriverRepositorySpy } = makeSut()
    addDriverRepositorySpy.result = false
    const result = await sut.add(mockAddDriverParams())
    expect(result).toBe(false)
  })

  it('Should return true if AddDriverRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.add(mockAddDriverParams())
    expect(result).toBe(true)
  })

  it('Should call CheckDriverByDocumentRepository with correct values', async () => {
    const { sut, checkDriverByDocumentRepositorySpy } = makeSut()
    const driverParams = mockAddDriverParams()
    await sut.add(driverParams)
    expect(checkDriverByDocumentRepositorySpy.document).toBe(
      driverParams.documentNumber,
    )
  })

  it('Should throw if CheckDriverByDocumentRepository throws', async () => {
    const { sut, checkDriverByDocumentRepositorySpy } = makeSut()
    jest
      .spyOn(checkDriverByDocumentRepositorySpy, 'checkByDocument')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.add(mockAddDriverParams())
    await expect(promise).rejects.toThrow()
  })
})

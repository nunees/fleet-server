export namespace AddDriver {
  export type Params = {
    firstName: string
    lastName: string
    birthDate: Date
    gender: string

    // Address
    addressLine: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string

    // Contact Information
    email: string
    phone: string
    mobile: string
    emergencyContact: string
    emergencyContactName: string

    // Document Information
    documentType: number
    documentNumber: string
    documentIssueDate: Date
    documentExpirationDate: Date
    documentIssuingAuthority: string

    // Driver's License Information
    licenseNumber: string
    licenseType: string
    licenseIssueDate: Date
    licenseExpirationDate: Date
    licenseIssuingAuthority: string
    licenseCategory: string
  }

  export type Result = boolean
}

export interface AddDriver {
  add: (params: AddDriver.Params) => Promise<AddDriver.Result>
}

export interface Vehicle {
    id?: string

    // Vehicle Information
    plate: string
    renavam: string
    chassis: string
    certificate: string
    brand: string
    model: string
    modelYear: number
    manufactureYear: number
    year: number
    color: string
    type: string
    fuel: string
    capacity: number
    weight: number
    belongingTo: string
    bodyType: string

    // License Information
    licenseCity: string
    licenseState: string
    licenseDate: Date
    licenseTransferDate: Date
    licenseExpirationDate: Date

    // Truck owner Information
    country: string
    cpf?: string
    taxId?: string
    antt?: string
    expirationDate?: Date

    // truck owner address
    addressLine: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string

    // others
    photos?: string[]
    documents?: string[]
    observations?: string
}
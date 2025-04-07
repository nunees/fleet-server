import { MaritalStatusEnum } from '@/domain/enums/marital-status-enum'
import { DocumentTypeEnum } from '@/domain/enums/document-type-enum'

export interface Driver {
  id?: string

  // Personal Information
  firstName: string
  lastName: string
  nickname?: string
  birthDate: Date
  gender: string
  avatar?: string
  fatherName?: string
  motherName?: string
  maritalStatus?: MaritalStatusEnum
  conjugalName?: string

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
  documentType: DocumentTypeEnum
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
  licenseRestrictions?: string
  licenseObservations?: string
  licenseStatus?: string

  // MOPP Information
  mopNumber?: string
  mopIssueDate?: Date
  mopExpirationDate?: Date
  mopIssuingAuthority?: string

  references?: []
  documents?: []
}

export type ReferencesData = {
  name: string
  relationship: string
  phone: string
}

export type DocumentsData = {
  type: string
  number: string
  issueDate: Date
  expirationDate: Date
  issuingAuthority: string
}

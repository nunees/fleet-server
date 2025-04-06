import { seedAccountType } from './account-types'
;(async () => {
  try {
    await seedAccountType()
    console.info('All seeds imported!')
  } catch (error) {
    console.error('There was an error seed data\nReason: ', error)
  }
})()

import config from './jest.config'
import { Config } from '@jest/types'

const jestConfig = config as Config.InitialOptions
jestConfig.testMatch = ['**/*.spec.ts']

export default jestConfig

export default {
  // Change the secret key in production
  jwtSecret:
    process.env.JWT_SECRET ||
    '7440c64049164c010ff02820ee1e3704a6de7fb5f8e2205cc2f2bacabd3af51a1b6b2827f3c4fbe203a019e94f787afc',
  port: process.env.PORT || 5050,
  baseURL: process.env.endpoint || '/api/v1',
}

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite",
    authentication_token_secret: "dev-secret"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    host: process.env.AUTH_TOKEN_SECRET,
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL'
  }
};

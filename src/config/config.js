module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite",
    authentication_token_secret: "dev-secret",
    logging: true
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: true
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    authentication_token_secret: (process.env.AUTH_TOKEN_SECRET || 'dev-secret'),
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    logging: true
  }
};

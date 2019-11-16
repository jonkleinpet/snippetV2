module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/snippet',
  JWT_SECRET: process.env.JWT_SECRET || 'snippet-super-secret'
};

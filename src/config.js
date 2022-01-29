const dotenv = require('dotenv');
const path = require('path');
const { cleanEnv, str } = require('envalid');

dotenv.config({ path: path.resolve('.env') });

const env = cleanEnv(process.env, {
  PORT: str(),
  TOKEN_SECRET: str(),
  ACCESS_KEY: str(),
  BUCKET_NAME: str(),
  SECRET_ACCESS_KEY: str(),
  DB_HOST: str({ default: 'fastfood-mongo' }),
  DB_PORT: str({ default: '27017' }),
  DB_NAME: str({ default: 'fastfooddb' }),
  EMAIL_PASSWORD: str(),
  EMAIL: str()
});

module.exports = {
  secretToken: env.TOKEN_SECRET,
  emailOfSendler: env.EMAIL,
  passwordOfSendler: env.EMAIL_PASSWORD,
  port: env.PORT,
  accessKey: env.ACCESS_KEY,
  bucketName: env.BUCKET_NAME,
  secretAccess: env.SECRET_ACCESS_KEY,
  database: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    url: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`
  }
};

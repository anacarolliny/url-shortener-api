import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export const JwtTokenSigninConfig: JwtSignOptions = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN || '60m',
};

export const JwtTokenVerifyConfig: JwtVerifyOptions = {
  secret: process.env.JWT_SECRET_KEY,
  ignoreExpiration: false,
};

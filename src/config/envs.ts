import 'dotenv/config';
import * as joi from 'joi';

interface EnvsVars {
  PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().default(3000),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env) as {
  error: joi.ValidationError;
  value: EnvsVars;
};

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvsVars = value;

export const envs = {
  port: envVars.PORT,
};

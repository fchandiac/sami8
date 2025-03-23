import 'dotenv/config';
import * as joi from 'joi';


// GATEWAY_PORT=8001
// NEXT_PORT=8000
// RABBITMQ_PORT=5672


// DATABASE_HOST=localhost
// DATABASE_PORT=3306
// DATABASE_USER=root
// DATABASE_PASSWORD=fenasantma

// AUTH_DATABASE_NAME=auth-sami-app
// PRODUCT_DATABASE_NAME



interface EnvVars {
    GATEWAY_PORT: number;
    NEXT_PORT: number;
    RABBITMQ_PORT: number;
    RABBITMQ_URL: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    AUTH_DATABASE_NAME: string;
    COMMERCE_DATABASE_NAME: string;
    PRODUCT_DATABASE_NAME: string;



}

const envVarsSchema: joi.ObjectSchema = joi.object({
    GATEWAY_PORT: joi.number().required(),
    NEXT_PORT: joi.number().required(),
    RABBITMQ_PORT: joi.number().required(),
    RABBITMQ_URL: joi.string().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
    DATABASE_USER: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    AUTH_DATABASE_NAME: joi.string().required(),
    COMMERCE_DATABASE_NAME: joi.string().required(),
    PRODUCT_DATABASE_NAME: joi.string().required(),

    
    
}).unknown(true);


const { value: envVars, error } = envVarsSchema.validate(process.env, {
    allowUnknown: true,
 
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}




export const envs = {
    seed: envVars.SEED_MODE,
    gateway: {
        port: envVars.GATEWAY_PORT,
    },
 
    next: {
        port: envVars.NEXT_PORT,
    },
    rabbitmq: {
        port: envVars.RABBITMQ_PORT,
        url: envVars.RABBITMQ_URL,
    },
 
    database: {
        host: envVars.DATABASE_HOST,
        port: envVars.DATABASE_PORT,
        user: envVars.DATABASE_USER,
        password: envVars.DATABASE_PASSWORD,
        authDatabaseName: envVars.AUTH_DATABASE_NAME,
        commerceDatabaseName: envVars.COMMERCE_DATABASE_NAME,
        productDatabaseName: envVars.PRODUCT_DATABASE_NAME,
    },
};
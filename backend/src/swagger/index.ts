// https://joooohee.tistory.com/10
// https://gngsn.tistory.com/69
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Express Service with Swagger",
            version: "1.0.0",
            description: "a Rest api using swagger and express.",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: [
        "src/swagger/**/*.yml", "src/routes/**/*Routes.ts","src/swagger/**/*.ts"
    ],
};
const specs = swaggerJsdoc(options);

export {
    swaggerUi, specs
};
import dotenv from 'dotenv';
dotenv.config();
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for my Node.js app',
        },
        servers: [
            {
                url: `${process.env.SWAGGER_DOCS_URL || 'http://localhost:3000'}`,
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [
        '../hck-connect/routes/nav-controller/*.js',
        '../hck-connect/routes/logo/*.js',
        '../hck-connect/routes/body/*.js',
        '../hck-connect/routes/nav-controller/color/*.js',
        '../middleware/*.js',
        '../docs/*.yaml',
    ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes*.js'], // files containing annotations as above
  };

const specs = swaggerJsDoc(options);

export { specs, swaggerUi };

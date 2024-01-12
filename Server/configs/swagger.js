import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API",
        version: "1.0.0",
        description: "API",
      },
      servers: [
        {
          url: "http://localhost:5001/"
        }
      ]
    },
    apis: ["./routes/*.js"]
  };

const specs = swaggerJsDoc(options);

export { specs, swaggerUi };

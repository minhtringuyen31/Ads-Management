import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "Server Express API with Swagger", 
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `http://localhost:5001/`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

export { specs, swaggerUi };

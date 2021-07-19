import express, { Application } from "express";
import { servicesRouter } from "./domain/services/router";
import jwt from "express-jwt";
import cors from "cors";
import jwks from "jwks-rsa";
import expressWinston from "express-winston";
import winston from "winston";
import { seedRouter } from "./routes/seed";
import { promosRouter } from "./routes/promos";

const app: Application = express();
const port = 3001;

// Body parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://promos-codes.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://promo-codes.app/api",
  issuer: "https://promos-codes.eu.auth0.com/",
  algorithms: ["RS256"],
  resultProperty: "locals.user",
});

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize({
        all: true,
      }),
      winston.format.label({
        label: "[LOGGER]",
      }),
      winston.format.timestamp({
        format: "YY-MM-DD HH:MM:SS",
      }),
      winston.format.printf(
        (info) =>
          ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
      )
    ),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  })
);

app.use(jwtCheck);

/**
 * Required for demo purposes
 */
app.use("/seed", seedRouter);
app.use("/services", servicesRouter);
app.use("/promos", promosRouter);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
  })
);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}

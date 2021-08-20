import convict from "convict";
import convctValidator from "convict-format-with-validator";

convict.addFormat(convctValidator.ipaddress);

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3001,
    env: "PORT",
    arg: "port",
  },
  logLevel: {
    doc: "The log level",
    format: "*",
    default: "info",
    env: "LOG_LEVEL",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: "*",
      default: "127.0.0.1",
      env: "DB_HOST"
    },
    name: {
      doc: "Database name",
      format: String,
      default: "",
      env: "DB_NAME"
    },
    user: {
      doc: "Database user name",
      format: String,
      default: "",
      env: "DB_USER"
    },
    password: {
      doc: "Database password",
      format: String,
      default: "",
      env: "DB_PASSWORD"
    },
  },
});

// Load environment dependent configuration
const env = config.get("env");
config.loadFile("./.env." + env + ".json");

// Perform validation
config.validate({ allowed: "strict" });

export default config;

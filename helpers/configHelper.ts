import config from "../config";

export function isDevelopment() {
    const env = config.get("env");

    return env === "development";
}
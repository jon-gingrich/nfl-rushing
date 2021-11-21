import config from "config";
import { IConfigApp } from "../config/constraint";

declare module "config" {
  interface IConfig {
    getTyped: <T extends keyof IConfigApp>(key: T) => IConfigApp[T];
  }
}
const prototype: config.IConfig = Object.getPrototypeOf(config);

prototype.getTyped = config.get;

export { config };

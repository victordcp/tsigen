import { IConfigRepository } from "../IConfigRepository";
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export interface IConfig {
  postgresql: IPGConfig;
  mysql: IPGConfig;
}

export interface IPGConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export class YAMLProvider implements IConfigRepository {
  private cfg: any;
  constructor(private src = 'config.yml') {
    try {
      this.cfg = yaml.load(fs.readFileSync(this.src, 'utf8')) as IConfig;
    } catch (e) {
      console.log(e);
    }
  }

  getConfig<T>(param: string): T {
    return (this.cfg && this.cfg[param] ? this.cfg[param] : null);
  }
}
import { IDatabaseRepository } from "../IDatabaseRepository";
import { Client } from 'pg';
import { IConfigRepository } from "../IConfigRepository";
import { IPGConfig } from "./YAMLProvider";
import { exit } from "process";
const prompt = require('select-prompt');

/* 
  THIS CLASS IS A COMPLETE MESS!

  I'll fix it later, trust me... 
  ;)
*/
export class PostgresqlProvider implements IDatabaseRepository {
  private client: Client;

  constructor(private configRepository: IConfigRepository) {
    const cfg = configRepository.getConfig<IPGConfig>('postgresql');

    try {
      this.client = new Client(cfg);
    } catch (e) {
      console.log({ yolo: e }) // FIX THIS CRAP LATER
      throw e;
    }
  }

  async getTablesStructure(): Promise<any> {
    this.client.connect();
    const schemas = await this.getSchemas();
    const schema = await this.pickSchema(schemas);
    console.log(await this.getTablesConfig(schema));
    this.client.end();
  }

  private async getSchemas(): Promise<{ schema_name: string }[]> {
    return new Promise((resolve, reject) => {
      this.client.query(
        `SELECT schema_name
           FROM information_schema.schemata 
          WHERE schema_name !~ 'pg_' 
            AND schema_name != 'information_schema'
            AND schema_name != 'laravel'
       ORDER BY schema_name;`,
        async (err, res) => {
          if (err)
            reject(err)
          else
            resolve(res.rows)
        });
    });
  }

  private async pickSchema(rows: { schema_name: string }[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = rows.map((row) => {
        return { title: row.schema_name, value: row.schema_name }
      });

      const cfg = [
        'Pick one Schema to be mapped:',
        options,
        { cursor: 0 }
      ];

      prompt(...cfg)
        .on('abort', () => reject('Aborting...'))
        .on('submit', (v: string) => resolve(v));
    });
  }

  private async getTablesConfig(schema: string) {
    return new Promise((resolve, reject) => {
      if (!schema)
        reject('Invalid schema.');

      this.client.query(
        `SELECT table_name AS "table" ,
                json_agg(json_build_object('column', column_name, 'type', udt_name)) AS columns
           FROM INFORMATION_SCHEMA.COLUMNS
          WHERE table_schema = '${schema}'
          GROUP BY table_name;`,
        async (err, res) => {
          if (err)
            reject(err)
          else
            resolve(res.rows)
        });
    });
  }
}
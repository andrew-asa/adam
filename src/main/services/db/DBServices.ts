import path from "path";
import fs from "fs";
import PouchDB from "pouchdb";
import { Doc, DocRes } from "./types";
import { ServicesProvider } from "../types";
import { extend } from "@/common/common_utils";
export class DBServices implements ServicesProvider {
  readonly docMaxByteLength;
  readonly docAttachmentMaxByteLength;
  public dbpath;
  public defaultDbName;
  public pouchDB: any;
  constructor(dbPath: string) {
    this.docMaxByteLength = 2 * 1024 * 1024; // 2M
    this.docAttachmentMaxByteLength = 20 * 1024 * 1024; // 20M
    this.dbpath = dbPath;
    this.defaultDbName = path.join(dbPath, "db_store");
    this.init();
  }


  init() {
    console.log(`DBServices init: ${this.defaultDbName}`);
    fs.existsSync(this.dbpath) || fs.mkdirSync(this.dbpath);
    this.pouchDB = new PouchDB(this.defaultDbName, { auto_compaction: true });
  }
  private getDocID(data: { name: string, prefex?: string[] }): string {
    if (data.prefex && data.prefex.length) {
      return `${data.prefex.join("/")}/${data.name}`
    }
    return data.name
  }

  private createDocRes(data: { name: string, prefex?: string[] }, dbRes: any): DocRes {
    return {
      name: data.name,
      ok: true,
      queryResult: dbRes
    }
  }

  private createDocErrorRes(data: { name: string, prefex?: string[] }, reason: string): DocRes {
    return {
      name: data.name,
      ok: false,
      reason: reason
    }
  }
  /**
   * 增
   */
  async add(
    data: {
      name: string,
      prefex?: string[],
      doc: any,
    }
  ): Promise<DocRes> {
    let id = this.getDocID(data);
    data.doc._id = id
    try {
      const s = extend({}, data.doc, { _id: id });
      const result: any = await this.pouchDB.put(s);
      return this.createDocRes(data, result)
    } catch (e: any) {
      return this.createDocErrorRes(data, e.message)
    }
  }
  /**
   * 删
   */
  async delete(
    data: {
      name: string,
      prefex?: string[]
    }): Promise<DocRes> {
    try {

      const doc = await this.get(data);
      if (doc) {
        let ret = await this.pouchDB.remove(doc.queryResult._id);
        return this.createDocRes(data, ret)
      } else {
        return this.createDocErrorRes(data, `not exist item ${name}`)
      }
    } catch (e: any) {
      return this.createDocErrorRes(data, e.message)
    }
  }
  /**
   * 改
   */
  async updated(
    data: {
      name: string,
      prefex?: string[],
      doc: any
    }): Promise<DocRes> {
    try {
      let id = this.getDocID(data);
      const ret_doc = await this.pouchDB.get(id);
      if (ret_doc) {
        // data.doc._rev = ret_doc._rev
        const s = extend(true, {}, ret_doc, data.doc, { _id: id });
        let ret = await this.pouchDB.put(s);
        return this.createDocRes(data, ret)
      } else {
        return this.createDocErrorRes(data, `not exist item ${data.name}`)
      }
    } catch (e: any) {
      return this.createDocErrorRes(data, e.message)
    }
  }

  /**
   * 查
   */
  async get(
    data: {
      name: string,
      prefex?: string[]
    }): Promise<DocRes | null> {
    let id = this.getDocID(data);
    try {
      let result = await this.pouchDB.get(id);
      return this.createDocRes(data, result)
    } catch {
      return null
    }
  }

  getProviders(): { [key: string]: Function } {

    return {
      dbAdd: this.add.bind(this),
      dbDelete: this.delete.bind(this),
      dbUpdate: this.updated.bind(this),
      dbGet: this.get.bind(this),
    }
  }
}



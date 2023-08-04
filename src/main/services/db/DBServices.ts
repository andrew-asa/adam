import path from "path";
import fs from "fs";
import PouchDB from "pouchdb";
import pouchdbFind from 'pouchdb-find';
import { extend } from "@/common/common_utils";
import { DocRes, ServicesProvider } from "@/common/core/types";
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
    PouchDB.plugin(pouchdbFind);
    this.pouchDB = new PouchDB(this.defaultDbName, { auto_compaction: true });
  }
  private getDocID(data: { name: string, prefix?: string[] }): string {
    if (data.prefix && data.prefix.length) {
      return `${data.prefix.join("_")}_${data.name}`
    }
    return data.name
  }

  private createDocRes(data: { name: string, prefix?: string[] }, dbRes: any): DocRes {
    delete dbRes._id
    delete dbRes._rev
    return {
      name: data.name,
      ok: true,
      data: dbRes
    }
  }

  private createDocErrorRes(data: { name: string, prefix?: string[] }, reason: any): DocRes {
    return {
      name: data.name,
      ok: false,
      data: reason.status ? extend({},
        {
          status: reason.status,
          message: reason.message
        }) : data.toString()
    }
  }
  /**
   * 增
   */
  async add(
    data: {
      name: string,
      prefix?: string[],
      doc: any,
    }
  ): Promise<DocRes> {
    let id = this.getDocID(data);
    try {
      const s = extend({}, data.doc, { _id: id });
      const result: any = await this.pouchDB.put(s);
      return this.createDocRes(data, {})
    } catch (e: any) {
      return this.createDocErrorRes(data, e)
    }
  }
  /**
   * 删
   */
  async delete(
    data: {
      name: string,
      prefix?: string[]
    }): Promise<DocRes> {
    try {
      let id = this.getDocID(data);
      const ret_doc = await this.pouchDB.get(id);
      let ret = await this.pouchDB.remove(ret_doc);
      return this.createDocRes(data, {})
    } catch (e: any) {
      return this.createDocErrorRes(data, e)
    }
  }
  /**
   * 改
   */
  async update(
    data: {
      name: string,
      prefix?: string[],
      doc: any
    }): Promise<DocRes> {
    try {
      let id = this.getDocID(data);
      const ret_doc = await this.pouchDB.get(id);
      // data.doc._rev = ret_doc._rev
      const s = extend(true, {}, ret_doc, data.doc, { _id: id });
      let ret = await this.pouchDB.put(s);
      return this.createDocRes(data, {})
    } catch (e: any) {
      return this.createDocErrorRes(data, e)
    }
  }
  /**
   * 有则更新，没则新建
   */
  async put(data: {
    name: string,
    prefix?: string[],
    doc: any,
    cover?: boolean
  }): Promise<DocRes> {
    try {
      let id = this.getDocID(data);
      const ret_doc = await this.pouchDB.get(id);
      // data.doc._rev = ret_doc._rev
      const s = extend(true, {}, data.cover ? {
        _rev: ret_doc._rev
      } : ret_doc, data.doc, { _id: id });
      let ret = await this.pouchDB.put(s);
      return this.createDocRes(data, {})
    } catch (e: any) {
      // 文档不存在
      if (e.status === 404) {
        return this.add(data)
      } else {
        return this.createDocErrorRes(data, e)
      }
    }
  }

  /**
   * 查
   */
  async get(
    data: {
      name: string,
      prefix?: string[]
    }): Promise<DocRes> {
    let id = this.getDocID(data);
    try {
      let result = await this.pouchDB.get(id);
      return this.createDocRes(data, result)
    } catch (e: any) {
      if (e.status === 404) {
        return this.createDocRes(data, {})
      } else {
        return this.createDocErrorRes(data, e)
      }
    }
  }

  async findStrartWithName(
    data: {
      name: string,
      prefix?: string[]
    }
  ): Promise<DocRes> {
    try {
      let id = this.getDocID(data);
      let result = await this.pouchDB.find({
        selector: {
          _id: { $regex: `'^${id}'` }
        }
      });
      return this.createDocRes(data, result)
    } catch (e: any) {
      return this.createDocErrorRes(data, e)
    }
  }

  async getAllDocs(option: {
    include_docs?: boolean,
    [key: string]: any
  }): Promise<DocRes> {
    let result = await this.pouchDB.allDocs(option);
    return this.createDocRes({ name: "all_docs" }, result)
  }

  async removeAllDocs(option: {
    [key: string]: any
  }): Promise<DocRes> {
    try {
      const result = await this.pouchDB.allDocs({ include_docs: true })
      const docsToDelete = result.rows.map(function (row) {
        return { _id: row.doc._id, _rev: row.doc._rev, _deleted: true };
      });
      const ret = await this.pouchDB.bulkDocs(docsToDelete);
      return this.createDocRes({ name: "all_docs" }, ret)
    } catch (error) {
      return this.createDocErrorRes({ name: "all_docs" }, error)
    }
  }
}



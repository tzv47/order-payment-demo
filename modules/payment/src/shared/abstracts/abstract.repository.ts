import { ReturnModelType } from "@typegoose/typegoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AbstractRepository<T> {
  constructor(protected model: ReturnModelType<any>) {}

  public async all(filters: {} = null): Promise<T[]> {
    return this.model.find(filters);
  }

  public async get(id: string, query: {} = null): Promise<T> {
    return this.model.findOne({ ...query, _id: id });
  }

  public async getOneBy(property, value, query: {} = null): Promise<T> {
    return this.model.findOne({ [property]: value, ...query });
  }

  public async create(body: T): Promise<T> {
    return this.model.create(body);
  }

  public async bulk(body: T[]): Promise<T[]> {
    const bulkOperations = [];
    for (const element of body) {
      const _id = (element as any)._id;
      if (_id) {
        bulkOperations.push(
          this.model.update(
            {
              _id
            },
            element,
            { upsert: true }
          )
        );
      } else {
        bulkOperations.push(this.model.create(element));
      }
    }
    return Promise.all(bulkOperations);
  }

  public async update(id: string, body: T): Promise<T> {
    return this.model.findOneAndUpdate({ _id: id }, body, { new: true });
  }

  public async delete(id: string): Promise<T> {
    return this.model.findOneAndDelete({ _id: id });
  }

  public async clear(key: string = null, ids: [] = []): Promise<T> {
    const query = {};
    if (key && ids.length > 0) {
      query[key] = { $in: ids };
    }

    return this.model.deleteMany(query);
  }
}

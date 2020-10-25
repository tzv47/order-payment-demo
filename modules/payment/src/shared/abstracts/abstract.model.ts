import { modelOptions } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface AbstractModel extends Base<string>, TimeStamps {}
@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export abstract class AbstractModel {}

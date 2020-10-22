import { plugin, modelOptions } from "@typegoose/typegoose";
import * as mhidden from "mongoose-hidden";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface AbstractModel extends Base<string>, TimeStamps {}
@plugin(mhidden({ defaultHidden: {}, applyRecursively: true }))
@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export abstract class AbstractModel {}

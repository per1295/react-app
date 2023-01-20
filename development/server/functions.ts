import { ColumnPost, Blogs } from "./mongoose/blog";
import type { IColumnPostSchema, IBlog } from "../types/blog";
import type { Model, Document, FlatRecord, Types } from "mongoose";
import type { Args } from "../types";
import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction, CookieOptions } from "express";

export async function initMongoDB() {
    const columnPostsLength = (await ColumnPost.find({})).length;
    const blogsLength = (await Blogs.find({})).length;

    if ( columnPostsLength === 0 ) {
        const columnPosts = JSON.parse((await import("./mongodb/columnPosts.json")).default) as IColumnPostSchema;
        await ColumnPost.insertMany(columnPosts);
    }
    if ( blogsLength === 0 ) {
        const blogs = JSON.parse((await import("./mongodb/blogs.json")).default) as IBlog[];
        await Blogs.insertMany(blogs);
    }
}

export async function createRandomId(Model: Model<any>): Promise<number> {
    const randomId = Math.floor(Math.random() * 1e6);
    const document = await Model.findOne({ id: randomId });

    if ( document ) {
        return await createRandomId(Model);
    } else {
        return randomId;
    }
}

export function getArgs(): Args {
    const objArgs: Args = {};
    const args = process.argv.slice(2);

    args.forEach(arg => {
        const [ key, value ] = arg.split("=");
        objArgs[key] = value;
    });

    return objArgs;
}

type Handler = (req: ExpressRequest, res: ExpressResponse, next?: NextFunction) => Promise<void | any> | void | any;

export function wrappedHandlers(...handlers: Handler[]): Handler[] {
    const wrappeds: Handler[] = [];

    for ( let i = 0; i < handlers.length; i++ ) {
        const wrappedHandler: Handler = async (req: ExpressRequest, res: ExpressResponse, next?: NextFunction) => {
            try {
                await handlers[i](req, res, next);
            } catch (error) {
                const e = error as Error;

                console.log(e);

                res.status(404).type("plain").send(e.toString());
            }
        }

        wrappeds.push(wrappedHandler);
    }

    return wrappeds;
}

export function setHeaders(res: ExpressResponse, headers: Pick<RequestInit, "headers">) {
    for ( let [ header, value ] of Object.assign(headers) ) {
        res.set(header, value);
    }
}

export function setCookies(res: ExpressResponse, cookies: { [key: string]: string }) {
    const options: CookieOptions = {
        expires: new Date(Date.now() + 8.64e7),
        path: "/"
    }

    for ( let [ cookie, value ] of Object.entries(cookies) ) {
        res.cookie(cookie, value, options);
    }
}

export function getApiRoute(route: string): string {
    route = route.replace(/^\//, "");
    return encodeURI(`/api/${route}`);
}

export function methodGetPOJO
(this: Document<unknown, any, FlatRecord<Omit<any, "id">>> & FlatRecord<Omit<any, "id">> & {
    _id: Types.ObjectId;
})
{
    const pojo = this.toObject({ virtuals: true, versionKey: false });
    const normalizePOJO = Object.fromEntries(Object.entries(pojo).filter(([key]) => key !== "_id"));
    
    return normalizePOJO;
}
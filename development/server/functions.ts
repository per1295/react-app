import { ColumnPost, Blogs } from "./mongoose/blog";
import type { IColumnPost, IBlog } from "../types/blog";
import type { Model, Document, FlatRecord, Types } from "mongoose";
import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction, CookieOptions } from "express";
import type { Args } from "../types";
import { config } from "dotenv";

config();

export async function initMongoDB() {
    const columnPostsLength = (await ColumnPost.find({})).length;
    const blogsLength = (await Blogs.find({})).length;

    function normalizeId(doc: any) {
        doc._id = doc._id.$oid;
        return doc; 
    }

    if ( !columnPostsLength ) {
        let columnPosts = (await import("./mongodb/columnPosts.json")).default as unknown as IColumnPost[];
        columnPosts = columnPosts.map(columnPost => normalizeId(columnPost));
        await ColumnPost.insertMany(columnPosts);
    }
    if ( !blogsLength ) {
        let blogs = (await import("./mongodb/blogs.json")).default as unknown as IBlog[];
        blogs = blogs.map(blog => normalizeId(blog));
        await Blogs.insertMany(blogs);
    }
}

export async function createRandomId(Model: Model<any>): Promise<number> {
    const id = Math.floor(Math.random() * 1e6);
    const document = await Model.findOne({ id });

    return document ? await createRandomId(Model) : id;
}

export function getArgs(): Args {
    const objArgs: { [key: string]: string } = {};
    const args = process.argv.slice(2);

    args.forEach(arg => {
        const [ key, value ] = arg.split("=");
        objArgs[key] = value;
    });

    return objArgs as unknown as Args;
}

type Handler = (req: ExpressRequest, res: ExpressResponse, next?: NextFunction) => Promise<void | any> | void | any;

export function wrappedHandlers(...handlers: Handler[]): Handler[] {
    const wrappeds: Handler[] = [];

    for ( let i = 0; i < handlers.length; i++ ) {
        const wrappedHandler: Handler = async (req: ExpressRequest, res: ExpressResponse, next?: NextFunction) => {
            try {
                const { NODE_ENV } = getArgs();

                if ( NODE_ENV !== "production" ) {
                    let { method, headers } = req;
                    method = method.toLowerCase();

                    switch(method) {
                        case "options":
                            res
                            .set("Access-Control-Allow-Methods", "PATCH,PUT,DELETE")
                            .set("Access-Control-Allow-Headers", Object.keys(headers).join(","))
                            .set("Access-Control-Max-Age", "86400");
                            break;
                        default:
                            res.set("Access-Control-Allow-Origin", headers.origin);
                            break;
                    }
                }

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

export async function getResponseData<DataType>(response: Response): Promise<DataType> {
    const type = response.headers.get("Content-Type");
    if ( !type ) throw new TypeError("Type is not defined");

    let result: any;

    if ( /^application/.test(type) ) result = await response.json();
    else if ( /^text/.test(type) ) result = await response.text();
    else result = await response.text();

    return result as DataType;
}

export function getApiURL(req: ExpressRequest, path: string): URL {
    const { protocol, hostname } = req;
    const { PORT } = process.env;
    return new URL(getApiRoute(path), `${protocol}://${hostname}${PORT ? `:${PORT}` : ""}`);
}

export function getPathsOfManifest(manifest: string, type: "js" | "css"): string {
    const manifestObj = JSON.parse(manifest) as Object;
    const filterRegExp = new RegExp(`\.${type}$`);

    return Object
    .values(manifestObj)
    .filter(path => filterRegExp.test(path))
    .map(path => {
        if ( /\.js$/.test(path) ) {
            return `<script defer src="${path}"></script>`
        } else if ( /\.css$/.test(path) ) {
            return `<link rel="stylesheet" href="${path}">`;
        } else {
            throw new TypeError("Unknown extation of path");
        }
    })
    .join("\n");
}
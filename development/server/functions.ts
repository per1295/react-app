import { ColumnPost, Blogs } from "./mongoose/blog";
import type { IColumnPostSchema, IBlog } from "./types/blog";
import { Response } from "./constructors";

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

export function createResponse(res: Response): Response {
    return new Response(res);
}
import { Router, json } from "express";
import { SearchInput, ColumnPost, Blogs } from "../mongoose/blog";
import { setCookies, wrappedHandlers, methodGetPOJO, getApiURL, getResponseData } from "../functions";
import type { IBlog, ISearchInput, IGetBlogsQuery, IPutBlogsQuery } from '../../types/blog';
import type { Document, Types } from "mongoose";

const jsonParser = json();
const blogs = Router();

blogs.get("/", ...wrappedHandlers(
    async (req, res) => {
        const getApiURLBinded = getApiURL.bind(null, req);
        const promisedResponses: Promise<Response>[] = [];

        promisedResponses.push(
            fetch(getApiURLBinded("/blog/blogs")),
            fetch(getApiURLBinded("/blog/columnPosts"))
        )

        const responseResults = await Promise.allSettled(promisedResponses);
        const responses = responseResults.map(responseResult => {
            return responseResult.status === "fulfilled" ? responseResult.value : new Response(responseResult.reason, {
                status: 404,
                statusText: responseResult.reason
            })
        });

        const datas: unknown[] = [];

        for ( let response of responses ) {
            let data = await getResponseData(response);
            datas.push(data);
        }

        const response = {
            blogs: datas[0],
            columnPosts: datas[1]
        };

        res.json(response);
    }
));

blogs.post("/searchInput", jsonParser, ...wrappedHandlers(
    async (req, res) => {
        const { value } = req.body as ISearchInput;

        const searchInput = await SearchInput.findOne({});
        let newSearchInput: (Document<unknown, any, Omit<ISearchInput, "id">> & Omit<ISearchInput, "id"> & {
            _id: Types.ObjectId;
        });

        if ( searchInput ) {
            searchInput.values.push(value);
            newSearchInput = await searchInput.save();
        } else {
            newSearchInput = new SearchInput({ values: [ value ] });
            newSearchInput = await newSearchInput.save();
        };

        setCookies(res, {
            "search-input": newSearchInput.values.join("_")
        });
        
        res.send("Your search is saved");
    }
));

blogs.get("/columnPosts", ...wrappedHandlers(
    async (_req, res) => {
        const columnPosts = await ColumnPost.find({});
        const columnPostsPOJO = columnPosts.map(columnPost => methodGetPOJO.apply(columnPost));
        res.json(columnPostsPOJO);
    }
));

blogs
    .route("/blogs")
    .get(...wrappedHandlers(
        async (req, res) => {
            let { lastID } = req.query as unknown as IGetBlogsQuery;
            let blogs: any[];
            let wasLastBlog = false;
            const resultBlogs: any[] = [];

            if ( lastID ) {
                blogs = await Blogs.find({});

                blogs.forEach(blog => {
                    if ( blog.id === lastID ) {
                        wasLastBlog = true;
                    } else if ( wasLastBlog ) {
                        resultBlogs.push(blog);
                    }
                });

                blogs = resultBlogs.slice(0, 3);
                
                if ( !blogs.length ) {
                    return res.send("No more blogs for now");
                }
            } else {
                blogs = await Blogs.find({}).limit(3);
            }

            lastID = blogs.at(-1)?.id;

            blogs = blogs.map(blog => methodGetPOJO.apply(blog));

            res.json({ content: blogs, lastID });
        }
    ))
    .patch(jsonParser, ...wrappedHandlers(
        async (req, res) => {
            let { id, typeUpdate } = req.query as unknown as IPutBlogsQuery;

            let {
                comments,
                countComments,
                countLikes,
                usersWhoLiked
            } = req.body as Pick<IBlog, "comments" | "countComments" | "countLikes" | "usersWhoLiked">;

            const blog = await Blogs.findById(id);

            if ( !blog ) {
                return res.status(404).send("Wrong idOfBlog");
            }

            if ( typeof comments === "string" ) comments = JSON.parse(comments);
            if ( typeof usersWhoLiked === "string" ) usersWhoLiked = JSON.parse(usersWhoLiked);

            switch(typeUpdate) {
                case "comments":
                    blog.comments = comments;
                    blog.countComments = countComments;

                    await blog.save();

                    res.send("Comments were saved");
                    break;
                case "likes":
                    blog.countLikes = +countLikes;
                    blog.usersWhoLiked = usersWhoLiked;

                    await blog.save();

                    res.send("Likes were saved");
                    break;
                default:
                    res.status(404).send("Wrong update type");
                    break;
            }
        }
    ));

export default blogs;
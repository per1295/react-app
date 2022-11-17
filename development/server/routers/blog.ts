import { Router, json } from "express";
import { IBlog, ISearchInput, ISearchInputSchema, IGetBlogsQuery, IPutBlogsQuery } from '../types/blog';
import { SearchInput, ColumnPost, Blogs } from "../mongoose/blog";
import type { Document, Types } from "mongoose";
import type { IAppLocals } from "../types/home";
import { createResponse } from "../functions";

const jsonParser = json();
const blog = Router();

blog.post("/searchInput", jsonParser, async (req, res) => {
    try {
        const { value } = req.body as ISearchInput;
        const { cookieOptions } = req.app.locals as IAppLocals;

        const searchInput = await SearchInput.findOne({});
        let newSearchInput: (Document<unknown, any, ISearchInputSchema> & ISearchInputSchema & {
            _id: Types.ObjectId;
        });

        if ( searchInput ) {
            searchInput.values.push(value);
            newSearchInput = await searchInput.save();
        } else {
            newSearchInput = new SearchInput({ values: [ value ] });
            newSearchInput = await newSearchInput.save();
        };
        
        res
        .cookie("search-input", newSearchInput.values.join("_"), cookieOptions)
        .json(createResponse({
            status: "success",
            message: "Your search is saved"
        }));
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
});

blog.get("/columnPosts", async (_req, res) => {
    try {
        const columnPosts = await ColumnPost.find({}, { _id: 0 });
        res.json(createResponse({
            status: "success",
            message: columnPosts
        }));
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
});

blog
.route("/blogs")
.get(async (req, res) => {
    try {
        let { lastId } = req.query as unknown as IGetBlogsQuery;
        let blogs: Document<unknown, any, IBlog>[];

        if ( lastId ) {
            blogs = await Blogs
            .find({}, { _id: false })
            .where("id")
            .lt(+lastId)
            .sort({
                id: -1
            })
            .limit(3);

            if ( blogs.length === 0 ) {
                return res.json(createResponse({
                    status: "success",
                    message: "No more blogs for now"
                }));
            }
        } else {
            blogs = await Blogs
            .find({}, { _id: false })
            .sort({
                id: -1
            })
            .limit(3);
        }

        lastId = blogs.at(-1)?.get("id");

        res.json(createResponse({
            status: "success",
            message: { blogs, lastId }
        }));
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
})
.patch(jsonParser, async (req, res) => {
    try {
        let { id, typeUpdate } = req.query as unknown as IPutBlogsQuery;
        const {
            comments,
            countComments,
            countLikes,
            usersWhoLiked
        } = req.body as Pick<IBlog, "comments" | "countComments" | "countLikes" | "usersWhoLiked">;
        const blog = await Blogs.findOne({ id: +id });
        if ( !blog ) {
            return res.status(404).json(createResponse({
                status: "fail",
                message: "Wrong idOfBlog"
            }));
        }

        switch(typeUpdate) {
            case "comments":
                blog.comments = comments;
                blog.countComments = countComments;
                await blog.save();
                res.json(createResponse({
                    status: "success",
                    message: "Comments were saved"
                }));
                break;
            case "likes":
                blog.countLikes = +countLikes;
                blog.usersWhoLiked = usersWhoLiked;
                await blog.save();
                res.json(createResponse({
                    status: "success",
                    message: "Likes were saved"
                }));
                break;
            default:
                res.status(404).json(createResponse({
                    status: "fail",
                    message: "Wrong update type"
                }));
                break;
        }
    } catch (error) {
        const errorTyped = error as Error;
        console.error(`${errorTyped.name}: ${errorTyped.message}`);
        res.status(404).json(createResponse({
            status: "fail",
            message: "Unknown error"
        }));
    }
});

export default blog;
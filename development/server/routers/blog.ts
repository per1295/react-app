import { Router, json } from "express";
import { IBlog, ISearchInput, ISearchInputSchema, IGetBlogsQuery, IPutBlogsQuery } from '../types/blog';
import { SearchInput, ColumnPost, Blogs } from "../mongoose/blog";
import { Response } from "../constructors";
import { Document, Types } from "mongoose";

const jsonParser = json();
const blog = Router();

blog.post("/searchInput", jsonParser, async (req, res) => {
    try {
        const { value } = req.body as ISearchInput;
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
            .cookie("searchInput", newSearchInput.values.join(" "), { maxAge: 3.6e6, path: "/" })
            .json(
                new Response({
                    status: "success",
                    message: "Your search is saved"
                })
            );
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
});

blog.get("/columnPosts", async (_req, res) => {
    try {
        const columnPosts = await ColumnPost.find({}, { _id: 0 });
        res.json(
            new Response({
                status: "success",
                message: JSON.stringify(columnPosts)
            })
        );
    } catch (error) {
        const err = error as Error;
        console.log(`${err.name}: ${err.message}`);
    }
});

blog.route("/blogs")
    .get(async (req, res) => {
        try {
            const { startId, endId } = req.query as unknown as IGetBlogsQuery;
            const blogs = await Blogs
            .find({}, { _id: 0 })
            .where("idOfBlog").gte(+startId).lte(+endId)
            .limit(3)
            .sort({ idOfBlog: "asc" });

            if ( blogs.length === 0 ) return res.json(
                new Response({
                    status: "success",
                    message: "No blogs for now"
                })
            );

            res.json(
                new Response({
                    status: "success",
                    message: JSON.stringify(blogs)
                })
            );
        } catch (error) {
            const err = error as Error;
            console.log(`${err.name}: ${err.message}`);
        }
    })
    .put(jsonParser, async (req, res) => {
        try {
            let { idOfBlog, typeUpdate } = req.query as unknown as IPutBlogsQuery;
            const {
                comments,
                countComments,
                countLikes,
                usersWhoLiked
            } = req.body as Pick<IBlog, "comments" | "countComments" | "countLikes" | "usersWhoLiked">;
            const blog = await Blogs.findOne({ idOfBlog: +idOfBlog });
            if ( !blog ) {
                return res.status(404).json(
                    new Response({
                        status: "fail",
                        message: "Wrong idOfBlog"
                    })
                );
            }

            switch(typeUpdate) {
                case "comments":
                    blog.comments = comments;
                    blog.countComments = countComments;
                    await blog.save();
                    res.json(
                        new Response({
                            status: "success",
                            message: "Comments were saved"
                        })
                    );
                    break;
                case "likes":
                    blog.countLikes = +countLikes;
                    blog.usersWhoLiked = usersWhoLiked;
                    await blog.save();
                    res.json(
                        new Response({
                            status: "success",
                            message: "Likes were saved"
                        })
                    )
                    break;
                default:
                    res.status(404).json(
                        new Response({
                            status: "fail",
                            message: "Wrong update type"
                        })
                    )
                    break;
            }
        } catch (error) {
            const errorTyped = error as Error;
            console.error(`${errorTyped.name}: ${errorTyped.message}`);
            res.status(404).json(
                new Response({
                    status: "fail",
                    message: "Unknown error"
                })
            );
        }
    });

export default blog;
import { Router, json } from "express";
import { IBlog, ISearchInput, ISearchInputSchema, IGetBlogsQuery, IPutBlogsQuery } from '../../types/blog';
import { SearchInput, ColumnPost, Blogs } from "../mongoose/blog";
import type { Document, Types } from "mongoose";
import { setCookies, wrappedHandlers } from "../functions";

const jsonParser = json();
const blogs = Router();

blogs.post("/searchInput", jsonParser, ...wrappedHandlers(
    async (req, res) => {
        const { value } = req.body as ISearchInput;

        const searchInput = await SearchInput.findOne({});
        let newSearchInput: (Document<unknown, any, Omit<ISearchInputSchema, "id">> & Omit<ISearchInputSchema, "id"> & {
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
        
        res.type("plain").send("Your search is saved");
    }
));

blogs.get("/columnPosts", ...wrappedHandlers(
    async (_req, res) => {
        const columnPosts = await ColumnPost.find({}, { _id: 0 });
        res.json(columnPosts);
    }
));

blogs
    .route("/blogs")
    .get(...wrappedHandlers(
        async (req, res) => {
            let { lastId } = req.query as unknown as IGetBlogsQuery;
            let blogs: any[];

            if ( lastId ) {
                blogs = await Blogs
                .find({})
                .where("id")
                .lt(+lastId)
                .sort({
                    _id: -1
                })
                .limit(3);

                if ( blogs.length === 0 ) {
                    return res.type("plain").send("No more blogs for now");
                }
            } else {
                blogs = await Blogs
                .find({})
                .sort({
                    _id: -1
                })
                .limit(3);
            }

            lastId = blogs.at(-1)?.id;

            blogs = blogs.map(blog => blog.methodGetPOJO());

            res.json({ blogs, lastId });
        }
    ))
    .patch(jsonParser, ...wrappedHandlers(
        async (req, res) => {
            let { id: _id, typeUpdate } = req.query as unknown as IPutBlogsQuery;

            const {
                comments,
                countComments,
                countLikes,
                usersWhoLiked
            } = req.body as Pick<IBlog, "comments" | "countComments" | "countLikes" | "usersWhoLiked">;

            const blog = await Blogs.findOne({ _id });

            if ( !blog ) {
                return res.status(404).type("plain").send("Wrong idOfBlog");
            }

            switch(typeUpdate) {
                case "comments":
                    blog.comments = comments;
                    blog.countComments = countComments;

                    await blog.save();

                    res.type("plain").send("Comments were saved");
                    break;
                case "likes":
                    blog.countLikes = +countLikes;
                    blog.usersWhoLiked = usersWhoLiked;

                    await blog.save();

                    res.type("plain").send("Likes were saved");
                    break;
                default:
                    res.status(404).type("plain").send("Wrong update type");
                    break;
            }
        }
    ));

export default blogs;
import { Schema, model } from "mongoose";
import { IEmailData } from "../types/home";
import { ISearchInputSchema, IColumnPostSchema, IBlog, IEmailDataComment } from "../types/blog";

const searchInputSchema = new Schema<ISearchInputSchema>({
    id: {
        type: Number,
        reuired: true
    },
    values: {
        type: [ String ],
        required: true
    }
}, {
    collection: "searchValues"
});

export const SearchInput = model("searchValue", searchInputSchema);

const columnPostSchema = new Schema<IColumnPostSchema>({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, {
    collection: "columnPosts"
});

export const ColumnPost = model("columnPost", columnPostSchema);

const emailDataSchema = new Schema<IEmailData>({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    }
}, {
    _id: false
});

const emailDataCommentSchema = new Schema<IEmailDataComment>({
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const blogsSchema = new Schema<IBlog>({
    id: {
        type: Number,
        requred: true
    },
    img: {
        type: String,
        required: true
    },
    countLikes: {
        type: Number,
        required: true
    },
    countComments: {
        type: Number,
        required: true
    },
    dateOfCreation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    usersWhoLiked: {
        type: [ emailDataSchema ],
        required: true
    },
    comments: {
        type: [ emailDataCommentSchema ],
        required: true
    }
}, {
    collection: "blogs"
});

export const Blogs = model("blog", blogsSchema);
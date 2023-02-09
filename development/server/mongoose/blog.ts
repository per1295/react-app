import { Schema, model } from "mongoose";
import { methodGetPOJO } from "../functions";

import type { IEmailData, ExtendedSchema } from "../../types";
import type { ISearchInput, IColumnPost, IBlog, IEmailDataComment } from "../../types/blog";

const searchInputSchema: ExtendedSchema<ISearchInput> = new Schema({
    values: {
        type: [ String ],
        required: true
    }
}, {
    collection: "searchValues",
    methods: {
        methodGetPOJO
    }
});

export const SearchInput = model("searchValue", searchInputSchema);

const columnPostSchema: ExtendedSchema<IColumnPost> = new Schema({
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
    collection: "columnPosts",
    methods: {
        methodGetPOJO
    }
});

export const ColumnPost = model("columnPost", columnPostSchema);

const emailDataSchema = new Schema<IEmailData>({
    id: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
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

const blogsSchema: ExtendedSchema<IBlog> = new Schema({
    img: {
        type: String,
        required: true,
        immutable: true
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
        required: true,
        immutable: true
    },
    description: {
        type: String,
        required: true,
        immutable: true
    },
    title: {
        type: String,
        required: true,
        immutable: true
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
    collection: "blogs",
    methods: {
        methodGetPOJO
    }
});

export const Blogs = model("blog", blogsSchema);
import { Schema, model } from "mongoose";
import { methodGetPOJO } from "../functions";

import type { IEmailData } from "../../types";
import type { ISearchInputSchema, IColumnPostSchema, IBlog, IEmailDataComment } from "../../types/blog";
import type { ExtendedSchema } from "../../types";

const searchInputSchema: ExtendedSchema<ISearchInputSchema> = new Schema({
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

const columnPostSchema = new Schema<Omit<IColumnPostSchema, "id">>({
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

const emailDataSchema = new Schema<Omit<IEmailData, "id">>({
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
import { IEmailData } from "./index";

export interface ISearchInput{
    value: string;
}

export interface ISearchInput {
    id: string;
    values: string[];
}

export interface IColumnPost {
    id: string;
    title: string;
    dateOfCreation: string;
    img: string;
}

export interface IEmailDataComment {
    email: string;
    comment: string;
}

export interface IBlog {
    id: string;
    img: string;
    countComments: number;
    countLikes: number;
    dateOfCreation: string;
    description: string;
    title: string;
    usersWhoLiked: IEmailData[];
    comments: IEmailDataComment[];
}

export interface IGetBlogsQuery {
    lastID: string;
}

export interface IPutBlogsQuery {
    id: string;
    typeUpdate: "comments" | "likes";
}

export interface BlogsResponse {
    content: IBlog[];
    lastID: string;
}

export interface BlogLoaderReturn {
    blogs: BlogsResponse;
    columnPosts: IColumnPost[];
}
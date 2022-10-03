import { IEmailData } from "./home";

export interface ISearchInput{
    value: string;
}

export interface ISearchInputSchema {
    values: string[];
}

export interface IColumnPostSchema {
    title: string;
    dateCreation: string;
    imgURL: string;
}

export interface IEmailDataComment {
    email: string;
    comment: string;
}

export interface IBlog {
    idOfBlog: number;
    imgURL: string;
    countComments: number;
    countLikes: number;
    dateCreation: string;
    description: string;
    title: string;
    usersWhoLiked: IEmailData[];
    comments: IEmailDataComment[];
}

export interface IGetBlogsQuery {
    startId: string;
    endId: string;
}

export interface IPutBlogsQuery {
    idOfBlog: string;
    typeUpdate: "comments" | "likes";
}
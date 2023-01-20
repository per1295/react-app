import { IEmailData } from "./index";

export interface ISearchInput{
    value: string;
}

export interface ISearchInputSchema {
    id: number;
    values: string[];
}

export interface IColumnPostSchema {
    id: number;
    title: string;
    dateOfCreation: string;
    img: string;
}

export interface IEmailDataComment {
    email: string;
    comment: string;
}

export interface IBlog {
    id: number;
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
    lastId: string;
}

export interface IPutBlogsQuery {
    id: string;
    typeUpdate: "comments" | "likes";
}
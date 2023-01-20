import React, { FunctionComponent, createContext, Dispatch, SetStateAction, useState } from "react";
import { useBlogData } from "../../customHooks";

import Img from "../../globalComponents/Img";
import MainBlogBodyItemUnder from "./MainBlogBodyItemUnder";
import MainBlogBodyItemTitle from "./MainBlogBodyItemTitle";
import MainBlogBodyItemDescription from "./MainBlogBodyItemDescription";
import MainBlogBodyItemReadMore from "./MainBlogBodyItemReadMore";
import MainBlogBodyItemWriteComment from "./MainBlogBodyItemWriteComment";
import MainBlogBodyItemComments from "./MainBlogBodyItemComments";

import "../styles/MainBlogBodyItem.scss"

interface IBlogItems {
    id: number;
}

export const IdContext = createContext<number>(0);

interface ICommentContext {
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
}

const commentContextInit = {} as ICommentContext;

export const CommentContext = createContext<ICommentContext>(commentContextInit);

interface ICommentVisibileContext {
    isCommentVisible: boolean;
    setIsCommentVisible: Dispatch<SetStateAction<boolean>>;
}

const commentVisibleContextInit = {} as ICommentVisibileContext;

export const CommentVisibleContext = createContext<ICommentVisibileContext>(commentVisibleContextInit);

const MainBlogBodyItem: FunctionComponent<IBlogItems> = ({ id }) => {
    const { blogData } = useBlogData(id);
    const { img } = blogData;
    const [ isReadMore, setIsReadMore ] = useState(false);

    const [ comment, setComment ] = useState("");
    const commentContext = { comment, setComment };

    const [ isCommentVisible, setIsCommentVisible ] = useState(false);
    const commentVisibleContext = { isCommentVisible, setIsCommentVisible };

    return(
        <IdContext.Provider value={id}>
            <CommentContext.Provider value={commentContext}>
                <CommentVisibleContext.Provider value={commentVisibleContext}>
                    <div className="mainBlog_body__item">
                        <Img src={img} alt="img_Blog" className="mainBlog_body__item___img"/>
                        <MainBlogBodyItemUnder/>
                        <MainBlogBodyItemWriteComment/>
                        <MainBlogBodyItemTitle/>
                        <MainBlogBodyItemDescription/>
                        <MainBlogBodyItemReadMore isReadMore={isReadMore} setIsReadMore={setIsReadMore} />
                        { isReadMore ? <MainBlogBodyItemComments/> : null }
                    </div>
                </CommentVisibleContext.Provider>
            </CommentContext.Provider>
        </IdContext.Provider>
    )
}

export default MainBlogBodyItem
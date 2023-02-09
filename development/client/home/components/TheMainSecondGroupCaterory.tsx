import React, { useState, createContext, Dispatch, SetStateAction } from "react";

import TheMainSecondGroupCategoryLeft from "./TheMainSecondGroupCategoryLeft";
import TheMainSecondGroupCategoryRight from "./TheMainSecondGroupCategoryRight";

import "../styles/TheMainSecondGroupCategory.scss";

interface CategoryContext {
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
}

export const CategoryContext = createContext<CategoryContext>({} as CategoryContext);

export default function TheMainSecondGroupCategory() {
    const [ category, setCategory ] = useState<string>("all");

    const contextValue = { category, setCategory };

    return(
        <CategoryContext.Provider value={contextValue}>
            <div className="main_secondGroup__category">
                <TheMainSecondGroupCategoryLeft/>
                <TheMainSecondGroupCategoryRight/>
            </div>
        </CategoryContext.Provider>
    )
}
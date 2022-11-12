import React, { MouseEventHandler, createRef } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "../client/globalComponents/Button";
import Img from "../client/globalComponents/Img";

jest.mock("../client/customHooks", () => ({
    __esModule: true,
    useTypedSelector: () => false
}));

let conteiner: HTMLDivElement | null = null;

beforeEach(() => {
    conteiner = document.createElement("div");
    document.body.appendChild(conteiner);
});

afterEach(() => {
    if ( conteiner ) {
        unmountComponentAtNode(conteiner);
        conteiner.remove();
        conteiner = null;
    }
});

test("Button", () => {
    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => event.currentTarget;
    const mockOnClick = jest.fn(onClick);

    act(() => {
        render(
        <Button startColor="green" onClick={mockOnClick}>
            Click me
        </Button>,
        conteiner);
    });

    const button = document.querySelector("button") as HTMLButtonElement;
    expect(button.textContent).toBe("Click me");
    expect(button.classList.contains("green")).toBeTruthy();

    const mouseEvent = new MouseEvent("click", { bubbles: true });

    act(() => {
        button.dispatchEvent(mouseEvent);
    });

    expect(mockOnClick).toBeCalledTimes(1);
    expect(mockOnClick.mock.results.at(0)?.value).toEqual(button);

    act(() => {
        Array.from({length: 3}).forEach(() => button.dispatchEvent(mouseEvent));
    });

    expect(mockOnClick).toBeCalledTimes(4);
    expect(mockOnClick.mock.results.at(3)?.value).toEqual(button);
});

test("Img", () => {
    const imgRef = createRef<HTMLImageElement>();

    act(() => {
        render(
            <Img ref={imgRef} src="/image" alt="image"/>,
            conteiner
        );
    });

    const img = document.querySelector("img") as HTMLImageElement;

    expect(img.alt).toBe("image");
    expect(img.src).toMatch(/\/image/);
});
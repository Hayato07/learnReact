
/**
 * タイマーを用いたテスト
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Card from "./card";

// これによってタイマーが使えるようになる(fakeのタイマー。設定した時間待つ必要はない)
jest.useFakeTimers();

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should select null after timing out", () =>{
    const onSelect = jest.fn();
    act(() => {
        render(<Card onSelect={onSelect} />, container);
    });

    // 100ms進める
    act(() => {
        jest.advanceTimersByTime(100);
    });
    expect(onSelect).not.toHaveBeenCalled();

    act(() => {
        jest.advanceTimersByTime(5000);
    });
    expect(onSelect).toHaveBeenCalledWith(null);
});

it("should cleanup on being removed", () => {
    const onSelect = jest.fn();
    act(() => {
        render(<Card onSelect={onSelect} />, container);
    });

    act(() => {
        jest.advanceTimersByTime(100);
    });
    expect(onSelect).not.toHaveBeenCalled();

    act(() => {
        render(null, container);
    });

    act(() => {
        jest.advanceTimersByTime(5000);
    });
    expect(onSelect).not.toHaveBeenCalled();
});

it("should accept selections", () => {
    const onSelect = jest.fn();
    act(() => {
        render(<Card onSelect={onSelect} />, container);
    });

    act(() => {
        container
            .querySelector("[data-testid='2']")
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onSelect).toHaveBeenCalledWith(2);
});
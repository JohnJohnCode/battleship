import React from "react";
import { getByText, screen, getByTestId } from "@testing-library/dom";
import { render, cleanup } from "@testing-library/react";
import Game from "./Game";

describe("Game renders correctly", () => {
    let container;
    beforeEach(() => {
        container = render(<Game />);
    });
    afterEach(() => cleanup());
    test("renders a button", () => {
        const button = screen.getByText(/start game/i);
    });
    test("renders 2 grids", () => {
        const grid1 = screen.getByTestId("playerGrid");
        const grid2 = screen.getByTestId("aiGrid");
    });
    test("renders ships", () => {
        const ship1 = screen.getByTestId("ship1");
        const ship2 = screen.getByTestId("ship2");
        const ship3 = screen.getByTestId("ship3");
        const ship4 = screen.getByTestId("ship4");
        const ship5 = screen.getByTestId("ship5");
    });
});
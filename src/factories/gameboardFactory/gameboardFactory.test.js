import createGameboard from "./gameboardFactory";

describe.only("gameboard works", () => {
    let testGameboard;
    let testShip;
    beforeEach(() => {
        testGameboard = createGameboard();
        testShip = jest.fn(() => {
            return {
                ship: {
                    name: "4",
                    length: 4,
                },
            };
        })();
    });
    afterAll(() => {
        testGameboard = null;
    });
    test("gameboard places ships correctly and saves coords", () => {
        testGameboard.placeShip(testShip, 4, 5, "x");
        expect(testGameboard.board[4][5]).toBe(1);
        expect(testGameboard.board[4][6]).toBe(1);
        expect(testGameboard.board[4][7]).toBe(1);
        expect(testGameboard.board[4][8]).toBe(1);
        expect(testGameboard.board[4][9]).toBe(0);
        expect(testGameboard.boardData.coords["4"]).toStrictEqual([4,5,"x"]);
    });
    test("gameboard doesn't allow bad positioning", () => {
        testGameboard.placeShip(testShip, 4, 8, "x");
        expect(testGameboard.board[4][8]).toBe(0);
    });
    test("receive attack works", () => {
        testGameboard.placeShip(testShip, 4, 5, "x");
        testGameboard.receiveAttack(4, 5);
        testGameboard.receiveAttack(4, 7);
        testGameboard.receiveAttack(5, 5);
        expect(testGameboard.board[4][5]).toBe(2);
        expect(testGameboard.board[4][6]).toBe(1);
        expect(testGameboard.board[4][7]).toBe(2);
        expect(testGameboard.board[5][5]).toBe(3);
    });
    test("reports game end", () => {
        testShip = jest.fn(() => {
            return {
                ship: {
                    name: "2",
                    length: 2,
                },
            };
        })();
        testGameboard.placeShip(testShip, 4, 5, "x");
        expect(testGameboard.boardData.totalHP).toBe(2);
        expect(testGameboard.boardData.isOver).toBeFalsy();
        testGameboard.receiveAttack(4, 5);
        testGameboard.receiveAttack(4, 6);
        expect(testGameboard.boardData.totalHP).toBe(0);
        expect(testGameboard.boardData.isOver).toBeTruthy();
    });
    test("rewrites coords", () => {
        testGameboard.placeShip(testShip, 4, 5, "x");
        expect(testGameboard.boardData.coords[testShip.ship.name]).toStrictEqual([4,5,"x"]);
        testGameboard.placeShip(testShip, 5, 5, "x");
        expect(testGameboard.boardData.coords[testShip.ship.name]).toStrictEqual([5,5,"x"]);
        expect(testGameboard.board[5][5]).toBe(1);
        expect(testGameboard.board[4][5]).toBe(0);
    });
});
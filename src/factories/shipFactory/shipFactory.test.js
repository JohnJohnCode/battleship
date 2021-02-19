import createShip from "./shipFactory";

describe("shipFactory", () => {
    test("hit successfully lowers ship hp", () => {
        const shipTest = createShip("5");
        shipTest.hit(3);
        shipTest.hit(1);
        expect(shipTest.ship.hp).toStrictEqual([1,0,1,0,0]);
    });
    test("sinks ship if hp hits 0", () => {
        const shipTest = createShip("2");
        shipTest.hit(1);
        shipTest.hit(2);
        expect(shipTest.isSunk()).toBeTruthy();
        expect(shipTest.ship.isSunk).toBeTruthy();
    });
    test("can't hit same cell multiple times", () => {
        const shipTest = createShip("3_1");
        shipTest.hit(2);
        shipTest.hit(2);
        expect(shipTest.ship.hp).toStrictEqual([0,1,0]);
    });
});
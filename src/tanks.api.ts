import { Tank } from "./tank.schema";

export const getTanks = async (): Promise<Tank[]> => {
    console.log("Get tanks");
    const response = await fetch("/api/tanks");
    const tanks = await response.json();
    return tanks;
};

export const getTank = async (id: string): Promise<Tank> => {
    console.log("Get tank");
    const response = await fetch(`/tanks/${id}`);
    const tank = await response.json();
    return tank;
};

export const postTank = async (tank: Tank) => {
    console.log("Post tank", tank);
};

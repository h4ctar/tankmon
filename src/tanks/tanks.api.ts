import { Tank } from "./tank.schema";

export const getTanks = async (): Promise<Tank[]> => {
    console.log("Get tanks");
    const response = await fetch("/api/tanks");
    const tanks = await response.json();
    console.log(tanks);
    return tanks;
};

export const getTank = async (id: string): Promise<Tank> => {
    console.log("Get tank");
    const response = await fetch(`/api/tanks/${id}`);
    const tank = await response.json();
    console.log(tank);
    return tank;
};

export const postTank = async (tank: Tank) => {
    console.log("Post tank", tank);

    const response = await fetch("/api/tanks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tank),
    });

    console.log(response);
};

import { Tank } from "./tank.schema";

export const getTanks = async (): Promise<Tank[]> => {
    console.info("Get tanks");
    const response = await fetch(`${import.meta.env.VITE_VERCEL_URL}/api/tanks`);
    const tanks = await response.json();
    return tanks;
};

export const getTank = async (id: string): Promise<Tank> => {
    console.info("Get tank");
    const response = await fetch(`${import.meta.env.VITE_VERCEL_URL}/api/tanks/${id}`);
    const tank = await response.json();
    return tank;
};

export const postTank = async (tank: Tank) => {
    console.info("Post tank", tank);

    await fetch(`${import.meta.env.VITE_VERCEL_URL}/api/tanks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tank),
    });
};
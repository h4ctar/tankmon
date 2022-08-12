import type { Tank } from "@tankmon/schema";

export const getTanks = async (): Promise<Tank[]> => {
    console.log("Get tanks");
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/tanks`);
    const tanks = await response.json();
    return tanks;
};

export const getTank = async (id: string): Promise<Tank> => {
    console.log("Get tank");
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/tanks/${id}`);
    const tank = await response.json();
    return tank;
};

export const postTank = async (tank: Tank) => {
    console.log("Post tank", tank);
};

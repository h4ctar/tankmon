import { Tank } from "./tank.schema";

export const getTanks = async (): Promise<Tank[]> => {
    console.info("Get tanks");
    const response = await fetch(`https://${import.meta.env.VITE_VERCEL_URL}/api/tanks`);
    const tanks = await response.json();

    delay(5000);

    return tanks;
};

export const getTank = (id: string) => async (): Promise<Tank> => {
    console.info("Get tank");
    const response = await fetch(`https://${import.meta.env.VITE_VERCEL_URL}/api/tanks/${id}`);
    const tank = await response.json();

    delay(5000);

    return tank;
};

export const postTank = async (tank: Tank) => {
    console.info("Post tank", tank);

    await fetch(`https://${import.meta.env.VITE_VERCEL_URL}/api/tanks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tank),
    });

    delay(5000);
};

const delay = async (duration: number) => new Promise<void>((resolve) => setTimeout(resolve, duration));

import { PostTank, TankResource } from "@tankmon/types";

export const getTanks = async (): Promise<TankResource[]> => {
    console.info("Get tanks");
    const response = await fetch(`/api/tanks`);
    const tanks = await response.json();

    delay(5000);

    return tanks;
};

export const getTank = (id: string) => async (): Promise<TankResource> => {
    console.info("Get tank");
    const response = await fetch(`/api/tanks/${id}`);
    console.log(await response.arrayBuffer());

    const tank = await response.json();
    console.log(tank);

    delay(5000);

    return tank;
};

export const postTank = async (postTank: PostTank) => {
    console.info("Post tank", postTank);

    await fetch(`/api/tanks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTank),
    });

    delay(5000);
};

const delay = async (duration: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, duration));

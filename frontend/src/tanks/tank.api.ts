import { PostTank, TankResource } from "@tankmon/types";

export const fetchTanks = async (): Promise<TankResource[]> => {
    console.info("Get tanks");
    const response = await fetch(`/api/tanks`);
    if (!response.ok) {
        throw new Error("Failed to get tanks");
    }

    const tanks = await response.json();
    return tanks;
};

export const fetchTank = (id: string) => async (): Promise<TankResource> => {
    console.info("Get tank");
    const response = await fetch(`/api/tanks/${id}`);
    if (!response.ok) {
        throw new Error("Failed to get tank");
    }

    const tank = await response.json();

    return tank;
};

export const createTank = async (postTank: PostTank) => {
    console.info("Post tank", postTank);

    const response = await fetch(`/api/tanks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTank),
    });
    if (!response.ok) {
        throw new Error("Failed to post tank");
    }
    const tank: TankResource = await response.json();

    return tank;
};

export const updateTank = async (
    tankId: string,
    postTank: PostTank,
): Promise<TankResource> => {
    const response = await fetch(`/api/tanks/${tankId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTank),
    });
    if (!response.ok) {
        throw new Error("Failed to update tank");
    }
    const tank: TankResource = await response.json();

    return tank;
};

export const deleteTank = async (tankId: string) => {
    const response = await fetch(`/api/tanks/${tankId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete tank");
    }
};

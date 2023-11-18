import {
    createTank,
    deleteTank,
    fetchTank,
    fetchTanks,
    updateTank,
} from "./tank.api";
import { PostTank } from "@tankmon/types";
import { useLocation } from "wouter";
import { queryClient } from "../query";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchTanks = () => {
    const query = useQuery({
        queryKey: ["tanks"],
        queryFn: fetchTanks,
    });

    return query;
};

export const useFetchTank = (tankId: string) => {
    const query = useQuery({
        queryKey: ["tank", tankId],
        queryFn: fetchTank(tankId),
    });

    return query;
};

export const useCreateTank = () => {
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: ({ postTank }: { postTank: PostTank }) =>
            createTank(postTank),
        onSuccess: async (tank) => {
            queryClient.invalidateQueries({
                queryKey: ["tanks"],
            });
            setLocation(`/tanks/${tank.id}`);
        },
    });

    return mutation;
};

export const useUpdateTank = () => {
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: ({
            tankId,
            postTank,
        }: {
            tankId: string;
            postTank: PostTank;
        }) => updateTank(tankId, postTank),
        onSuccess: async (tank) => {
            queryClient.invalidateQueries({
                queryKey: ["tanks"],
            });
            queryClient.invalidateQueries({
                queryKey: ["tank", tank.id],
            });
            setLocation(`/tanks/${tank.id}`);
        },
    });

    return mutation;
};

export const useDeleteTank = (tankId: string) => {
    const [, setLocation] = useLocation();

    const mutation = useMutation({
        mutationFn: () => deleteTank(tankId),
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ["tanks", tankId] });
            queryClient.invalidateQueries({
                queryKey: ["tanks"],
            });
            setLocation("/tanks");
        },
    });

    return mutation;
};

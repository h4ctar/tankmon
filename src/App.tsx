import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "react-query";
import { getTanks, postTank } from "./tanks.api";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TankList />
        </QueryClientProvider>
    );
};

const TankList = () => {
    const queryClient = useQueryClient();

    const query = useQuery("tanks", getTanks);

    const mutation = useMutation(postTank, {
        onSuccess: () => {
            queryClient.invalidateQueries("tanks");
        },
    });

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1>Tanks</h1>
                {query.data?.map((tank) => (
                    <button
                        key={tank.id}
                        className="px-6 py-2 rounded bg-green-800 hover:bg-green-600 text-white"
                        type="button"
                    >
                        {tank.name}
                    </button>
                ))}
                <button
                    className="px-6 py-2 rounded bg-green-800 hover:bg-green-600 text-white"
                    type="button"
                    onClick={() => mutation.mutate({ id: "asdf", capacity: 10, height: 2, name: "Tank" })}
                >
                    Post tank
                </button>
            </div>
        </div>
    );
};

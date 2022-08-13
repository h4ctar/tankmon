import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Tank } from "./tank.schema";
import { getTanks } from "./tanks.api";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TankList />
        </QueryClientProvider>
    );
};

const TankList = () => {
    // const queryClient = useQueryClient();
    const query = useQuery("tanks", getTanks);
    // const mutation = useMutation(postTank, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries("tanks");
    //     },
    // });

    return (
        <article>
            <header>
                <h2>Tanks</h2>
                <input type="text" placeholder="Filter tanks..." />
            </header>
            <section>
                <ul>
                    {query.data?.map((tank) => (
                        <TankCard key={tank.id} tank={tank} />
                    ))}
                </ul>
            </section>
        </article>
    );
};

type TankProps = {
    tank: Tank;
};

const TankCard = (props: TankProps) => {
    return (
        <li>
            <h3>{props.tank.name}</h3>
        </li>
    );
};

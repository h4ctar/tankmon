import { QueryClient, QueryClientProvider } from "react-query";
import { TankList } from "./tanks/TankList";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TankList />
        </QueryClientProvider>
    );
};

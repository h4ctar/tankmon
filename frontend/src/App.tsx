import { QueryClient, QueryClientProvider } from "react-query";
import { Link, Redirect, Route, Switch } from "wouter";
import { TankDetailsPage } from "./tanks/NewDetailsPage";
import { NewTankPage } from "./tanks/NewTankPage";
import { TankList } from "./tanks/TankList";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <article>
                <header>
                    <h2>
                        <Link to="/">TankMon</Link>
                    </h2>
                </header>
                <section>
                    <Switch>
                        <Route path="/">
                            <Redirect to="/tanks" />
                        </Route>
                        <Route path="/tanks">
                            <TankList />
                        </Route>
                        <Route path="/tanks/new">
                            <NewTankPage />
                        </Route>
                        <Route path="/tanks/:tankId">
                            {(params) => (
                                <TankDetailsPage tankId={params.tankId} />
                            )}
                        </Route>
                        <Route>404, Not Found!</Route>
                    </Switch>
                </section>
            </article>
        </QueryClientProvider>
    );
};

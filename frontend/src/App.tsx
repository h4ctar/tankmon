import { QueryClientProvider } from "@tanstack/react-query";
import { Link, Redirect, Route, Switch } from "wouter";
import { queryClient } from "./query";
import { TankCards } from "./tanks/TankCards";
import { TankDetailsPage } from "./tanks/TankDetailsPage";
import { TankForm } from "./tanks/TankForm";

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-row flex-wrap items-center justify-between gap-4 border-b p-5 shadow-lg ring-1 ring-slate-900/5 dark:border-slate-50/[0.06]">
                <h2 className="order-1 ">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl dark:text-white"
                    >
                        Tank Mon
                    </Link>
                </h2>
            </div>
            <div>
                <Switch>
                    <Route path="/">
                        <Redirect to="/tanks" />
                    </Route>
                    <Route path="/tanks">
                        <TankCards />
                    </Route>
                    <Route path="/tanks/new">
                        <TankForm />
                    </Route>
                    <Route path="/tanks/:tankId/edit">
                        {(params) => <TankForm tankId={params.tankId} />}
                    </Route>
                    <Route path="/tanks/:tankId">
                        {(params) => <TankDetailsPage tankId={params.tankId} />}
                    </Route>
                    <Route>404, Not Found!</Route>
                </Switch>
            </div>
        </QueryClientProvider>
    );
};

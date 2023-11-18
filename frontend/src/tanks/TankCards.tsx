import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Loading } from "../ui/Loading";
import { PlusIcon } from "../icons/PlusIcon";
import { useFetchTanks } from "./tank.hooks";

export const TankCards = () => {
    const fetchTanks = useFetchTanks();

    const parent = useRef(null);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    if (fetchTanks.isLoading) {
        return <Loading />;
    }

    if (fetchTanks.isError) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <ErrorMessage error={fetchTanks.error} />
            </div>
        );
    }

    const tanks = fetchTanks.data!;

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {tanks.map((tank) => (
                <Link
                    key={tank.id}
                    href={`/tanks/${tank.id}`}
                    className="dark:highlight-white/10 relative z-10 rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
                >
                    <h2 className="mx-3 mt-3 text-2xl font-bold">
                        {tank.name}
                    </h2>
                    <h3 className="mx-3 mb-3 text-lg text-slate-500">Test</h3>
                </Link>
            ))}
            <Link
                href="/tanks/new"
                className="dark:highlight-white/10 relative z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-white p-8 text-lg shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
            >
                <PlusIcon />
                Add tank
            </Link>
        </div>
    );
};

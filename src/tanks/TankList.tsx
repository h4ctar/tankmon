import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { NewTankCard } from "./NewTankCard";
import { TankCard } from "./TankCard";
import { getTanks } from "./tanks.api";

export const TankList = () => {
    const query = useQuery("tanks", getTanks);

    const parent = useRef(null);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    return (
        <article>
            <header>
                <h2>Tanks</h2>
                <input type="text" placeholder="Filter tanks..." />
            </header>
            <section className="card-container" ref={parent}>
                {query.data?.map((tank) => (
                    <TankCard key={tank._id} tank={tank} />
                ))}
                <NewTankCard />
            </section>
        </article>
    );
};

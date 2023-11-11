import { Link } from "wouter";
import { Tank, TankResource } from "@tankmon/types";

type Props = {
    tank: TankResource;
};

export const TankCard = (props: Props) => {
    return (
        <Link to={`/tanks/${props.tank.id}`}>
            <div className="card tank-card">
                <div className="tank-percentage">50%</div>
                <div className="tank-details">
                    <h3>{props.tank.name}</h3>
                    <p>10000 litres</p>
                </div>
            </div>
        </Link>
    );
};

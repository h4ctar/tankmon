import { Tank } from "./tank.schema";

type Props = {
    tank: Tank;
};

export const TankCard = (props: Props) => {
    return (
        <div className="card tank-card">
            <div className="tank-percentage">50%</div>
            <div className="tank-details">
                <h3>{props.tank.name}</h3>
                <p>10000 litres</p>
            </div>
        </div>
    );
};

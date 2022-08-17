import { Tank } from "./tank.schema";

type Props = {
    tank: Tank;
};

export const TankCard = (props: Props) => {
    return (
        <div className="card">
            <h3>{props.tank.name}</h3>
        </div>
    );
};

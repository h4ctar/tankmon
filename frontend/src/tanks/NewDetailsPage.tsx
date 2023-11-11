import { useQuery } from "react-query";
import { getTank } from "./tanks.api";

type Params = {
    tankId: string;
};

export const TankDetailsPage = (params: Params) => {
    const query = useQuery("tanks", getTank(params.tankId));

    return <h2>Tank Details</h2>;
};

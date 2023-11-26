import { TankResource } from "@tankmon/types";
import {
    CategoryScale,
    Chart,
    ChartData,
    ChartOptions,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

Chart.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

type Props = {
    tank: TankResource;
};

const options: ChartOptions<"line"> = {
    scales: {
        x: {
            type: "time",
            min: new Date().getTime() - 24 * 60 * 60 * 1000,
            max: new Date().getTime(),
        },
        y: {
            ticks: {
                format: {
                    style: "percent",
                },
            },
            min: 0,
            max: 1,
        },
    },
};

export const TankChart = ({ tank }: Props) => {
    const data: ChartData<"line"> = useMemo(
        () => ({
            labels: tank.status?.map((status) => status.publishedAt),
            datasets: [
                {
                    label: "Water level",
                    data: tank.status?.map((status) => status.waterLevel),
                    borderColor: "blue",
                    backgroundColor: "blue",
                },
                {
                    label: "Battery charge",
                    data: tank.status?.map((status) => status.batteryCharge),
                    borderColor: "green",
                    backgroundColor: "green",
                },
                {
                    label: "Signal strength",
                    data: tank.status?.map((status) => status.signalStrength),
                    borderColor: "red",
                    backgroundColor: "red",
                },
            ],
        }),
        [tank],
    );

    return <Line data={data} options={options} />;
};

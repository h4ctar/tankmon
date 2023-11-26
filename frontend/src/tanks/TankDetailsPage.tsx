import { Link } from "wouter";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Loading } from "../ui/Loading";
import { useDeleteTank, useFetchTank } from "./tank.hooks";
import { TankChart } from "./TankChart";

type Props = {
    tankId: string;
};

export const TankDetailsPage = ({ tankId }: Props) => {
    const fetchTank = useFetchTank(tankId);
    const deleteTank = useDeleteTank(tankId);

    if (fetchTank.isLoading) {
        return <Loading />;
    }

    if (fetchTank.isError) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <ErrorMessage error={fetchTank.error} />
            </div>
        );
    }

    const tank = fetchTank.data!;

    const onDeleteClick = () => {
        if (confirm(`Are you sure you want to delete ${tank.name}?`)) {
            deleteTank.mutate();
        }
    };

    return (
        <div className="mx-auto flex max-w-7xl flex-col items-center p-5">
            <div className="flex w-full flex-row">
                <div className="flex-grow">
                    <h1 className="mx-5 mt-5 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                        {tank.name}
                    </h1>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <button onClick={onDeleteClick} aria-label="delete">
                        <TrashIcon />
                    </button>
                    <Link href={`/tanks/${tankId}/edit`}>
                        <a aria-label="edit">
                            <PencilIcon />
                        </a>
                    </Link>
                </div>
            </div>
            <TankChart tank={tank} />
        </div>
    );
};

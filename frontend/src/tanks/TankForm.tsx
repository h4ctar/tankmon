import { zodResolver } from "@hookform/resolvers/zod";
import { PostTank } from "@tankmon/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";
import { TextInput } from "../ui/TextInput";
import { fetchTank } from "./tank.api";
import { useCreateTank, useUpdateTank } from "./tank.hooks";

type Props = {
    tankId?: string;
};

export const TankForm = ({ tankId }: Props) => {
    const createTank = useCreateTank();
    const updateTank = useUpdateTank();

    const form = useForm<PostTank>({
        resolver: zodResolver(PostTank),
    });

    useEffect(() => {
        if (tankId) {
            fetchTank(tankId)().then((tank) => form.reset(tank));
            // TODO: catch error
        } else {
            form.reset();
        }
    }, [tankId]);

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-4 p-5">
            {updateTank.isError && <ErrorMessage error={updateTank.error} />}
            {createTank.isError && <ErrorMessage error={createTank.error} />}
            <form
                onSubmit={form.handleSubmit((postTank) =>
                    tankId
                        ? updateTank.mutate({
                              tankId,
                              postTank,
                          })
                        : createTank.mutate({ postTank }),
                )}
                className="flex flex-col gap-4"
            >
                <div className="grid grid-cols-1 gap-4">
                    <TextInput name="name" label="Tank name" form={form} />
                    <TextInput name="id" label="Tank monitor ID" form={form} />
                    <TextInput
                        name="capacity"
                        label="Tank capacity (litres)"
                        type="number"
                        form={form}
                    />
                    <TextInput
                        name="diameter"
                        label="Tank diameter (metres)"
                        type="number"
                        form={form}
                    />
                    <TextInput
                        name="sensorHeight"
                        label="Sensor height (metres)"
                        type="number"
                        form={form}
                    />
                </div>

                <input
                    className="dark:highlight-white/20 rounded-lg bg-slate-900 px-6 py-2 text-center font-semibold text-white hover:bg-slate-700 focus:outline-none dark:bg-sky-500 dark:hover:bg-sky-400"
                    type="submit"
                    value={tankId ? "Update tank" : "Add tank"}
                />
            </form>
        </div>
    );
};

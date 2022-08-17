import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Tank } from "./tank.schema";
import { postTank } from "./tanks.api";
import classNames from "classnames";

export const NewTankForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Tank>({ resolver: zodResolver(Tank) });

    const queryClient = useQueryClient();
    const mutation = useMutation(postTank, {
        onSuccess: () => {
            queryClient.invalidateQueries("tanks");
            // TODO: close form
        },
    });

    const submit = (tank: Tank) => {
        console.log(tank);
        mutation.mutate(tank);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Add tank</h3>
                <form onSubmit={handleSubmit(submit)}>
                    <label htmlFor="tank-name-input">Tank name</label>
                    <input
                        id="tank-name-input"
                        type="text"
                        placeholder="Tank name"
                        {...register("name")}
                        className={classNames({ error: !!errors.name })}
                    />
                    {errors.name?.message && <p className="error">{errors.name?.message}</p>}

                    <input
                        type="text"
                        placeholder="Tank monitor ID"
                        className={classNames({ error: !!errors.monitorId })}
                        {...register("monitorId")}
                        formNoValidate
                    />
                    {errors.monitorId?.message && <p className="error">{errors.monitorId?.message}</p>}

                    <input
                        type="number"
                        placeholder="Tank capacity (litres)"
                        className={classNames({ error: !!errors.capacity })}
                        {...register("capacity", { valueAsNumber: true })}
                    />
                    {errors.capacity?.message && <p className="error">{errors.capacity?.message}</p>}

                    <input
                        type="number"
                        placeholder="Diameter of tank (metres)"
                        className={classNames({ error: !!errors.diameter })}
                        {...register("diameter", { valueAsNumber: true })}
                    />
                    {errors.diameter?.message && <p className="error">{errors.diameter?.message}</p>}

                    <input
                        type="number"
                        placeholder="Height of sensor above bottom of tank (metres)"
                        className={classNames({ error: !!errors.sensorHeight })}
                        {...register("sensorHeight", { valueAsNumber: true })}
                    />
                    {errors.sensorHeight?.message && <p className="error">{errors.sensorHeight?.message}</p>}

                    <button type="submit">Add tank</button>
                </form>
            </div>
        </div>
    );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrorsImpl, useForm, UseFormRegister } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Tank } from "./tank.schema";
import { postTank } from "./tanks.api";
import classNames from "classnames";

type Props = {
    hide: () => void;
};

export const NewTankForm = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Tank>({ resolver: zodResolver(Tank) });

    const queryClient = useQueryClient();
    const mutation = useMutation(postTank, {
        onSuccess: () => {
            queryClient.invalidateQueries("tanks");
            props.hide();
        },
    });

    const submit = (tank: Tank) => mutation.mutate(tank);

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Add tank</h3>
                <form onSubmit={handleSubmit(submit)}>
                    <FormInput field="name" label="Tank name" register={register} errors={errors} />
                    <FormInput field="monitorId" label="Tank monitor ID" register={register} errors={errors} />
                    <FormInput
                        field="capacity"
                        label="Tank capacity (litres)"
                        number
                        register={register}
                        errors={errors}
                    />
                    <FormInput
                        field="diameter"
                        label="Tank diameter (metres)"
                        number
                        register={register}
                        errors={errors}
                    />
                    <FormInput
                        field="sensorHeight"
                        label="Sensor height (metres)"
                        number
                        register={register}
                        errors={errors}
                    />

                    <div className="button-group">
                        <button type="submit">Add tank</button>
                        <button
                            onClick={(event) => {
                                props.hide();
                                event.preventDefault();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

type FormInputProps = {
    field: keyof Tank;
    label: string;
    number?: boolean;
    register: UseFormRegister<Tank>;
    errors: FieldErrorsImpl<Tank>;
};

const FormInput = (props: FormInputProps) => {
    const inputId = `${props.field}-input`;

    return (
        <>
            <label htmlFor={inputId}>{props.label}</label>
            <input
                id={inputId}
                placeholder={props.label}
                className={classNames({ error: !!props.errors[props.field] })}
                {...props.register(props.field, { valueAsNumber: props.number })}
            />
            {props.errors[props.field]?.message && <p className="error">{props.errors[props.field]?.message}</p>}
        </>
    );
};

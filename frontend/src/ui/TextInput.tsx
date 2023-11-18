import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
    label: string;
    units?: string;
    name: Path<T>;
    type?: HTMLInputTypeAttribute;
    form: UseFormReturn<T>;
    className?: string;
};

export const TextInput = <T extends FieldValues>({
    label,
    units,
    name,
    type = "text",
    form,
    className,
}: Props<T>) => {
    return (
        <label className={className}>
            <span className="text-gray-700 dark:text-slate-400">{label}</span>
            <div className="relative">
                <input
                    className="w-full rounded-lg bg-white text-slate-800 [appearance:textfield] dark:bg-slate-800 dark:text-slate-300"
                    type={type}
                    {...form.register(name, {
                        valueAsNumber: type === "number",
                    })}
                    step="any"
                />
                {units && (
                    <div className="absolute inset-y-0 right-2 flex items-center">
                        <span className="text-gray-500 sm:text-sm">
                            {units}
                        </span>
                    </div>
                )}
            </div>
            {form.formState.errors[name]?.message && (
                <p className="mt-2 text-xs italic text-red-500">
                    {form.formState.errors[name]?.message as string}
                </p>
            )}
        </label>
    );
};

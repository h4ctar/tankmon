type Props = {
    error: unknown;
};

export class PartChatError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PartChatError";
    }
}

export const ErrorMessage = ({ error }: Props) => {
    let message = "Something went wrong";

    if (typeof error === "string") {
        message = error;
    }

    if (error instanceof PartChatError) {
        message = error.message;
    }

    return (
        <div className="mb-4 rounded-lg border border-red-700 bg-red-200 p-5 text-red-700">
            {message}
        </div>
    );
};

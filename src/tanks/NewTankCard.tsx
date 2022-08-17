import { useState } from "react";
import { NewTankForm } from "./NewTankForm";

export const NewTankCard = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <a className="new-card" onClick={() => setShowModal(true)}>
                <h3>Add tank</h3>
            </a>
            {showModal && <NewTankForm />}
        </>
    );
};

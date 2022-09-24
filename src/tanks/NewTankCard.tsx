import { useLocation } from "wouter";

export const NewTankCard = () => {
    const [location, setLocation] = useLocation();

    return (
        <>
            <a className="new-card" onClick={() => setLocation("/tanks/new")}>
                <h3>Add tank</h3>
            </a>
        </>
    );
};

export const App = () => {
    const makeRequest = () => {
        fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/test`)
            .then((res) => res.text())
            .then((data) => console.log(data));
    };

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1>hello</h1>
                <button
                    className="px-6 py-2 rounded bg-green-800 hover:bg-green-600 text-white"
                    type="button"
                    onClick={makeRequest}
                >
                    Click Me!
                </button>
            </div>
        </div>
    );
};

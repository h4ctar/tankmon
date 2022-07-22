export const App = () => {
    const makeRequest = () => {
        fetch(`${import.meta.env.BACKEND_BASE_URL}/test`)
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <div>
            <h1>hello</h1>
            <button onClick={makeRequest}>Click Me!</button>
        </div>
    );
};

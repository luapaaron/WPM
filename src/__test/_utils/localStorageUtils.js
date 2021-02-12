const localStorageMock = () => {
    const storage = {};

    return {
        setItem: (key, value) => {
            storage[key] = value;
        },
        getItem: key => storage[key],
        removeItem: key => {
            delete storage[key];
        }
    }
}

export default localStorageMock;
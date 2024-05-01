


export const getAllTypes = () => {
    return fetch("http://localhost:8088/type").then((res) => res.json())
}
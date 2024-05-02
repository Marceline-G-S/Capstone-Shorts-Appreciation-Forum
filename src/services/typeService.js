


export const getAllTypes = () => {
    return fetch("http://localhost:8088/type").then((res) => res.json())
}

export const getTypeById = (typeId) => {
    return fetch(`http://localhost:8088/type/${typeId}`).then((res) => res.json())
}
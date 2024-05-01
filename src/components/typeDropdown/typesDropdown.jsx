import { useEffect, useState } from "react";
import { getAllTypes } from "../../services/typeService.js";

export const TypesDropdown = ({ onTypeChange }) => {
    const [types, settypes] = useState([]);

    useEffect(() => {
        getAllTypes().then(typesData => {
            settypes(typesData);
        });
    }, []);

    const handleTypeChange = (event) => {
        const selectedTypeId = event.target.value;
        onTypeChange(selectedTypeId);
    };

    return (
        <div>
            <article className="posts">
                <select onChange={handleTypeChange}>
                    <option key={0} value={0}> {"Select your type"}</option>
                    {types.map((eachType) => (
                        <option key={eachType.id} value={eachType.id}> {eachType.typeName}</option>
                    ))}
                </select>
            </article>
        </div>
    )
}

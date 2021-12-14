import React, { useState } from 'react';
import AssociationsListing from "./AssociationsListing";


const Associations = () => {
    document.title = "Red Belt Gym - Associations";
    const [createButton, setCreateButton] = useState(null);
    const toggleCreate = (e) => {
        setCreateButton(e);
    };
    return (
        <>
            <AssociationsListing
                toggleCreate={toggleCreate}
            />
        </>
    )
}

export default Associations

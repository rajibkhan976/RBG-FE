import React, { useState } from 'react';
import OrganizationsListing from "./OrganizationsListing";


const Organizations = () => {
    document.title = "Red Belt Gym - Organizations";
    const [createButton, setCreateButton] = useState(null);
    const toggleCreate = (e) => {
        setCreateButton(e);
    };
    return (
        <>
            <OrganizationsListing
                toggleCreate={toggleCreate}
            />
        </>
    )
}

export default Organizations

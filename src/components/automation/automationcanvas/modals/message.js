import React, { memo, useState } from 'react';

export default memo(({ data }) => {
    const [setAutomationModal] = useState(null);
    const closeFilterModal = () => {
        setAutomationModal(null);
    };
    return (
        <React.Fragment>

        </React.Fragment>
    );
});

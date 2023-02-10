import React from 'react';
import { useParams } from 'react-router-dom';

function Com() {
    const params = useParams();
    console.log();
    return <div>{params.fightId}</div>;
}

export default Com;

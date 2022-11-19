import React from 'react';
import UserContext from '../../Context/Context';
import Navbar from '../../components/Navbar';

export default function AboutUs() {
    const [ctx, setCtx] = React.useContext(UserContext);

    return <>
        <Navbar />
        AboutUs page
    </>
}
import React from 'react';
import { Link } from 'react-router-dom';

const Page = () => {
    return (
        <div>
        <h1>Front Page</h1>
        <Link to="/about">about</Link>
        </div>
    );
}

export default Page;

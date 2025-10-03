import React from "react";
import { Outlet } from "react-router-dom";

const Base: React.FC = () => {

    return (
        <div className="d-flex flex-grow-1 container-fluid flex-column">
            <Outlet/>
        </div>
    );
}
export default Base
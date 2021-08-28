import { useState } from "react";
import { useCookies } from "react-cookie";
import Watch from "../iconsSvg/Watch";

const WatchedIcon = ({ addToWatchedHandler }) => {


    return (
        <span onClick={addToWatchedHandler}>
            <Watch />
        </span>
    );
}

export default WatchedIcon;
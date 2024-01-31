import React from "react";
import { useState, useEffect } from "react";
import OpenPositionCard from "./OpenPositionCard";

function OpenPositions() {

    const url = "http://127.0.0.1:5555"

    const [openPositions, setOpenPositions] = useState([])

    useEffect(() => {
        fetch(`${url}/open_positions`)
            .then((res) => res.json())
            .then((data) => {
                setOpenPositions(data)
            })
    }, [])

    return (
        <div>
            {openPositions.map((position) => (
                <OpenPositionCard key={position.id} position={position} url={url} />
            ))}
        </div>
    )
}

export default OpenPositions
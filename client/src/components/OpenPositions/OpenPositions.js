import React from "react";
import { useState, useEffect } from "react";
import OpenPositionCard from "./OpenPositionCard";
import NewOpenPositionForm from "./NewOpenPositionFrom";

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

    function addOpenPosition(position) {
        setOpenPositions([...openPositions, position])
    }

    return (
        <div>
            <div className="positionFormContainer">
                <NewOpenPositionForm addOpenPosition={addOpenPosition} />
            </div>
            <div className="openPositionContainer">
                {openPositions.map((position) => (
                    <OpenPositionCard key={position.id} position={position} url={url} />
                ))}
            </div>
        </div>
    )
}

export default OpenPositions
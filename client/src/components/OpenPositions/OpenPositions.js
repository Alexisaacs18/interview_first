import React from "react";
import { useState, useEffect } from "react";
import OpenPositionCard from "./OpenPositionCard";
import NewOpenPositionForm from "./NewOpenPositionFrom";

function OpenPositions() {

    const url = "http://127.0.0.1:5555"

    const [openPositions, setOpenPositions] = useState([])
    const [showForm, setShowForm] = useState(false)

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

    function handleClick() {
        setShowForm(prev => !prev)
    }

    function handleDelete(id) {
        const deletePosition = openPositions.filter((position) => (
            position.id !== id
        ))
        setOpenPositions(deletePosition)
    }

    return (
        <div>
            <div className="formButton">
                {showForm ? <button onClick={handleClick}>Hide Form</button> : <button onClick={handleClick}>Show Form</button>}
            </div>
            <div className="positionFormContainer">
                {showForm ? <NewOpenPositionForm addOpenPosition={addOpenPosition} /> : <div></div>}
            </div>
            <div className="openPositionContainer">
                {openPositions.map((position) => (
                    <OpenPositionCard key={position.id} position={position} url={url} handleDelete={handleDelete} />
                ))}
            </div>
        </div>
    )
}

export default OpenPositions
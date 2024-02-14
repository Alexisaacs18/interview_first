import React from "react";
import { useState, useEffect } from "react";
import OpenPositionCard from "./OpenPositionCard";
import NewOpenPositionForm from "./NewOpenPositionFrom";
import NavBar from "../../NavBar";

function OpenPositions() {

    const token = sessionStorage.getItem("access_token")

    const url = "http://0.0.0.0:10000"

    const [openPositions, setOpenPositions] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch(`${url}/open_positions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
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
            <div><NavBar /></div>
            <div>
                <div className="head">
                    <h1>Open Positions</h1>
                </div>
                <div className="formButton">
                    {showForm ? <button onClick={handleClick}>Hide Form</button> : <button onClick={handleClick}>Show Form</button>}
                </div>
                <div className="positionFormContainer">
                    {showForm ? <NewOpenPositionForm addOpenPosition={addOpenPosition} url={url} /> : <div></div>}
                </div>
                <div className="openPositionContainer">
                    {openPositions.length > 0 ? openPositions.map((position) => (
                        <OpenPositionCard key={position.id} position={position} url={url} handleDelete={handleDelete} />
                    )) : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default OpenPositions
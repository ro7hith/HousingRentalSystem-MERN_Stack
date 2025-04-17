import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import Rent from "./Rent";
import NavBar from "../Elements/Navbar";

function Rents () {

    const [rents, setRents] = useState([]);

    useEffect(() => {
        request("rent")
        .then(data => {
            setRents(data);
        });
    }, []);

    return (
        <>
            <NavBar />
            <div className="p-20 ">
                <h1 className="p-5 text-4xl font-bold mb-10">Rents</h1>
                {
                    rents.map(rent => (
                        <Rent
                            rent={rent} 
                            home={rent.home[0]}
                            lastPayment={rent.payments.flat().slice(-1)[0]}
                            user={rent.bookedBy[0]}
                        />
                    ))
                }
            </div>
        </>
    )

}

export default Rents;

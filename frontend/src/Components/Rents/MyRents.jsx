import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import Rent from "./Rent";
import NavBar from "../Elements/Navbar";

function MyRents () {

    const [rents, setRents] = useState([]);

    useEffect(() => {
        request("user/homes")
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                const myData = data[0];
                myData.homes = myData.homes.flat();
                setRents(myData || {});
            }
        });
    }, []);

    if (rents.length === 0) {
        return (
            <>
                <NavBar />
                <div className="p-20 ">
                    You dont have any rents
                </div>
            </>
        )
    }

    return (
        <>
            <NavBar />
            <div className="p-20 ">
                <h1 className="p-5 text-4xl font-bold mb-10">My Rents</h1>
                {
                    rents.rents.map(rent => (
                        <Rent 
                            rent={rent} 
                            home={rents.homes.find(c => c._id === rent.homeId)}
                            user={{ username: "you" }}
                            allowEdit
                            allowPayments
                        />
                    ))
                }
            </div>
        </>
    )

}

export default MyRents;

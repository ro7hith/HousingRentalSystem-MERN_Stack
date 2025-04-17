import React, { useEffect, useState } from "react";
import NavBar from "../Elements/Navbar";
import CreateUpdateHome from "./CreateUpdateHome";
import Rent from "./Rent";
import Home from "./Home";
import request from "../../utils/request";

function HomesList () {

    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toBook, setToBook] = useState();
    const [toEdit, setToEdit] = useState();

    useEffect(() => {
        request("home")
        .then(res => {
            res.forEach(home => {
                home.users = home.users.flat();
            });
            setHomes(res);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return "Loading ..."
    }

    if (toEdit) {
        return (<>
            <CreateUpdateHome
                prefill={toEdit?._id}
                onDone={({ data }) => {
                    const index = homes.findIndex(c => c._id._id === data._id);
                    homes[index]._id = data;
                    setHomes([...homes]);
                    setToEdit(undefined)
                }}
            />
        </>);
    }

    if (toBook) {
        return (
            <>
        <NavBar />
            <div className="px-20">
                <h1 className="p-5 text-4xl font-bold">Rent a home</h1>
                <Home 
                    home={toBook}
                    onRent={(home) => setToBook(home)}
                    hideRentButton
                />
                <hr class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                <Rent 
                    home={toBook} 
                    done={() => setToBook(undefined)} 
                />
            </div>
            </>
        )
    }

    return (
        <>
        <NavBar />
        <div className="px-20">
            <h1 className="p-5 text-4xl font-bold">Homes</h1>
            {
                homes.map(home => (
                    <Home 
                        home={home} 
                        onRent={(home) => setToBook(home)}
                        setHomeToEdit={() => setToEdit(home)}
                    />
                ))
            }
        </div>
        </>
    )
}

export default HomesList;

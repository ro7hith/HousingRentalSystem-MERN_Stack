import React from "react";
import fdtojson from "../../utils/fdtojson";
import request from "../../utils/request";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import Label from "../Elements/Label";

function Rent ({ home, done, allowEdit }) {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = fdtojson(e.target);
        const res = await request(`rent`, {
            method: "POST",
            body,
        });
        if (res.data) {
            window.alert("This property has been rented by you");
            done()
        }
        else if (res.error) {
            alert(res.error);
        }
        else {
            alert("unknown error");
        }
    }

    return (
        <div className="mt-10 w-1/2">
            <form onSubmit={handleSubmit}>
                <input
                    value={home?._id?._id}
                    name="homeId"
                    type="hidden"
                />
                <Label>For how long you want to rent his home</Label>
                <Input
                    type="number"
                    name="months"
                />
                <Button 
                    type="submit"
                >
                    Rent this home
                </Button>
            </form>
        </div>
    )
}

export default Rent;

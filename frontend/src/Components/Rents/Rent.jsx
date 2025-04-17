import React, { useRef, useState } from 'react';
import fdtojson from '../../utils/fdtojson';
import request from '../../utils/request';
import Button from '../Elements/Button';
import Input from '../Elements/Input';
import bedIcon from "../../public/bed.png";
import bathIcon from "../../public/bath.png";
import yearIcon from "../../public/year.png";
import moment from "moment"

function Rent ({ rent, home, lastPayment, user, allowPayments }) {

    const handlePayment = async (e) => {
        e.preventDefault();

        const body = fdtojson(e.target);
        const res = await request(`payments`, {
            method: "POST",
            body,
        });

        if (res.error) {
            alert(res.error);
        }
        else {
            alert("Payment Done");
        }
        e.target.reset();
        console.log(res);

    }

    const handleLeaveProperty = async (e) => {
        await request(`rent/${rent._id}`, {
            method: "PUT",
            body: {
                status: false,
                end: Date.now(),
            },
        });
        window.location.reload();
    }

    const deleteRent = async (id) => {
        await request(`rent/${id}`, { method: "Delete" });
        window.location.reload();
    }

    const handleEditPayment = async () => {
        const newAmount = window.prompt("New Amount");
        await request(`payments/${lastPayment?._id}`, {
            method: "PUT",
            body: {
                amount: newAmount,
            }
        });
        window.location.reload();
    }

    const handleDeletePayment = async () => {
        await request(`payments/${lastPayment?._id}`, { method: "DELETE" });
        window.location.reload();
    }

    if (!home) {
        return;
    }

    return (
        <div className='border-1 p-5 grid grid-cols-4'>
            <div>
                <img
                    alt=""
                    src={home?.image || "https://www.aayanauto.com/assets/images/Uploads/201932518145.png"}
                />
            </div>
            <div className="col-span-3 px-5">
                <p className="text-xl font-medium">{home?.description}</p>
                <p className="text-gray-700 text-s font-medium">
                  <img src={yearIcon} alt="bed" className="inline h-3 w-3 mr-1" />{" "}
                  {home?.yearBuilt}
                  <img src={bedIcon} alt="bed" className="inline h-4 w-4 ml-4 mr-2" />
                  {home?.bed}
                  <img src={bathIcon} alt="bed" className="inline h-3 w-3 ml-4 mr-2" />
                  {home?.bath}
                </p>
                <p>
                    Rented by {user?.username} for {rent.months} months
                </p>
                {<>
                    <div>
                        {
                            !rent.status ?
                            <span className='text-xs'>
                                The rent ended on {moment(new Date(rent.end)).format("MMM DD, YYY")}
                            </span> :
                        <span 
                            className='cursor-pointer text-xs underline'
                            onClick={() => handleLeaveProperty()}
                        >
                            Leave this property
                        </span>
                        }
                        <span 
                            className='cursor-pointer text-xs underline ml-2'
                            onClick={() => deleteRent(rent?._id)}
                        >Delete Rent</span>
                    </div>
                    </>
                }
                {
                    lastPayment ?
                    <>
                    <p>Last payment of ${lastPayment.amount} was made on {moment(new Date(lastPayment.createdAt)).format("MMM DD")} </p>
                    <div>
                        <span 
                            className='cursor-pointer text-xs underline'
                            onClick={handleEditPayment}
                        >
                            Edit Payment
                        </span>
                        <span 
                            className=' ml-2 cursor-pointer text-xs underline'
                            onClick={handleDeletePayment}
                        >
                            Delete Payment
                        </span>
                    </div>
                    </>:
                    allowPayments ?
                    <div className='mt-5'>
                        <form onSubmit={handlePayment}>
                            <input type="hidden" name="rentId" value={rent._id} />
                            <div className='mt-4' />
                            <div className='flex'>
                                <span className='mr-2'>
                            <Input 
                                placeholder="Amount"
                                name="amount"
                            />
                            </span>
                            <Button noMargins>
                                Pay Rent
                            </Button>
                            </div>
                        </form>
                    </div>
                    : null
                }
            </div>
        </div>
    )

}

export default Rent;

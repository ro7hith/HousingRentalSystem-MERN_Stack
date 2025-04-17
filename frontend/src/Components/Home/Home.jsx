import React from "react";
import request from "../../utils/request";
import Button from "../Elements/Button";
import bedIcon from "../../public/bed.png";
import bathIcon from "../../public/bath.png";
import yearIcon from "../../public/year.png";
import editIcon from "../../public/edit.png";
import trashIcon from "../../public/trash.png";


function Home({ home, onRent, hideRentButton, setHomeToEdit }) {
  const handleDelete = async (home) => {
    const req = await request("home/" + home?._id?._id, {
      method: "DELETE",
    });
    if (!req.error) {
      alert("Deleted");
      window.location.reload();
    }
  };

  return (
    <div className="border-1 p-5 grid grid-cols-4">
      <div>
        <img
          alt=""
          className="rounded-lg"
          src={
            home?._id?.image ||
            "https://dchba.org/wp-content/uploads/2020/06/house-placeholder.png"
          }
        />
      </div>
      <div className="col-span-3 px-5">
        <p className="text-xl font-medium">
          {home?._id?.description || <i>No title</i>}
          <span className="float-right">
          {hideRentButton ? null : (
              <span className="ml-4 cursor-pointer inline" onClick={() => setHomeToEdit(home)}>
                  <img src={editIcon} className="h-5 w-5 inline" />
              </span>
          )}
          {hideRentButton ? null : (
            <span className="ml-4 cursor-pointer" onClick={() => handleDelete(home)}>
              <img src={trashIcon} className="h-5 w-5 inline" />
            </span>
          )}
          </span>
        </p>
        <p className="text-gray-700 text-s font-medium">
          <img src={yearIcon} alt="bed" className="inline h-3 w-3 mr-1" />{" "}
          {home?._id?.yearBuilt}
          <img src={bedIcon} alt="bed" className="inline h-4 w-4 ml-4 mr-2" />
          {home?._id?.bed}
          <img src={bathIcon} alt="bed" className="inline h-3 w-3 ml-4 mr-2" />
          {home?._id?.bath}
        </p>
        <div className="mt-2">
            <span className="text-s italic font-italic">
              This home has been rented {home.rents.length} times {" "}
              {
                home.users.length === 0 ? "" :
                home.users.length === 1 ? `by ${home.users[0].username}` :
                `by ${home.users[0].name} and ${home.users.length - 1} others`
              }
            </span>
        </div>
        <div
          style={{
            position: "absolute",
            height: 30,
            marginTop: -30,
            width: 25 * 5,
            zIndex: 9999,
          }}
        />
        <span className="mt-5">
          {hideRentButton ? (
            <Button onClick={() => onRent(undefined)}>Back</Button>
          ) : home?.rents.find(r => r.status) ? <span className="text-xs font-medium text-orange-600">Already on rent</span> : (
            <Button onClick={() => onRent(home)}>Rent this home</Button>
          )}
        </span>
      </div>
    </div>
  );
}

export default Home;

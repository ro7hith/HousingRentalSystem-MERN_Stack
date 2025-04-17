import React, { useEffect, useMemo, useState } from "react";
import request from "../../utils/request";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import NavBar from "../Elements/Navbar";
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rents per day',
      },
    },
  };

function Dashboard () {

    const [rents, setRents] = useState([]);

    useEffect(() => {
        request("rent")
        .then(data => {
            setRents(data);
            console.log(data);
        });
    }, []);

    
    const data = useMemo(() => {
        const count = {};
        rents.forEach(b => {
            const day = moment(new Date(b.createdAt)).format("MMMM-DD-YYYY");
            if (count[day] && b.home.length > 0) {
                count[day]++;
            }
            else {
                count[day] = 1;
            }
        });
        return {
            labels: Object.keys(count),
            datasets: [{
                label: "Rents",
                data: Object.keys(count).map(key => count[key]),
                backgroundColor: '#ccc',
            }],
        };
    }, [rents]);


    return (
        <>
        <NavBar />
        <div 
            style={{ 
                width: "60%",
                height: 400,
                textAlign: "center",
                marginLeft: "20%",
                marginTop: 50,
            }}
        >
        <Bar 
            data={data}
            options={options}
        />
        </div>
        </>
    )
}

export default Dashboard;

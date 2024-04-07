import React, {useEffect, useState} from 'react';
import {Chart} from "react-google-charts";
import instanca from "../axios-instanca/instanca";

const Admin = () => {

    const [data, setData] = useState([]);

    const options = {
        title: 'Number of pins per board',
        pieHole: 0.4,
        is3D: true,
    }

    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        instanca.get("pin-per-board")
            .then(response => {
                console.log(response.data);

                setData([]);

                let podaci = [["Board", "Number of pins"]];

                response.data.podaci.map(board => {
                    podaci.push([board.title, board.pins_count]);
                });

                setData(podaci);
                setRefresh(true);

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>

            <div className="text-center mt-3">
                <h1 className="fw-bold">Admin page</h1>
                <p className="text-muted">Doing the magic</p>
            </div>
            
            {
                refresh && <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
            }

        </div>
    );
};

export default Admin;
import React, {useEffect, useState} from 'react';
import {Chart} from "react-google-charts";
import instanca from "../axios-instanca/instanca";
import {Row} from "react-bootstrap";

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

    const [link, setLink] = useState("http://127.0.0.1:8000/api/pins-paginate?page=1");
    const [perPage, setPerPage] = useState(10);
    const [pinovi, setPinovi] = useState([]);
    const [brojevi, setBrojevi] = useState([]);
    const [poruka, setPoruka] = useState("");

    useEffect(() => {
        instanca.get(link)
            .then(response => {
                console.log(response.data);
                setPinovi(response.data.podaci.data);

                if (brojevi.length === 0) {
                    setBrojevi(response.data.podaci.links)
                }

            })
            .catch(error => {
                console.log(error);
            });
    },[link]);


    const changeUrl = (url) => {
        setLink(url);
    }

    const deletePin = (id) => {
        //delete the pin

        instanca.delete("pins/"+id).then(response => {
            console.log(response.data);
            setPoruka("Pin deleted successfully");
            window.location.reload();
        }).catch(error => {
            console.log(error);
            setPoruka("Something went wrong. Please try again");
        })
    }

    return (
        <div>

            <div className="text-center mt-3">
                <h1 className="fw-bold">Admin page</h1>
                <p className="text-muted">Doing the magic</p>
                <h3>{
                    poruka
                }</h3>
            </div>


            <Row>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Pin title</th>
                        <th>Description</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pinovi && pinovi.map(pin => {
                            return (
                                <tr key={pin.id}>
                                    <td>{pin.pin_title}</td>
                                    <td>{pin.pin_description}</td>
                                    <td><button className="btn btn-danger" onClick={() => {
                                        deletePin(pin.id);
                                    }}>Delete {pin.pin_title}</button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>

                {
                    brojevi && (
                        <nav>
                            <ul className="pagination">
                                {
                                    brojevi.map((broj, index) => {

                                        if (broj.label === "&laquo; Previous") {
                                            broj.label = "Previous";
                                        }

                                        if (broj.label === "Next &raquo;") {
                                            broj.label = "Next";
                                        }

                                        return (
                                            <li key={index} className="page-item">
                                                <a className="page-link" onClick={() => {
                                                    if (broj.url !== null) {
                                                        changeUrl(broj.url);
                                                    }
                                                }}><span>{broj.label}</span></a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </nav>
                    )
                }

            </Row>

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
import React, {useEffect, useState} from 'react';
import instanca from "../axios-instanca/instanca";
import Board from "../komponente/Board";
import {Col, Row} from "react-bootstrap";
import PinCard from "../komponente/PinCard";

const Home = () => {

    const [data, setData] = useState([]);
    const [pins, setPins] = useState([]);
    const [filteredPins, setFilteredPins] = useState([]);

    const [person, setPerson] = useState(null);

    useEffect(() => {
        instanca.get("https://randomuser.me/api/")
            .then(response => {
                console.log(response.data);
                setPerson({
                    name: response.data.results[0].name.first + " " + response.data.results[0].name.last,
                    description: response.data.results[0].location.city,
                    picture: response.data.results[0].picture.large

                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        instanca.get("boards")
            .then(response => {
                console.log(response.data);
                setData(response.data.podaci);
                setFilteredPins(response.data.podaci);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [selectedBoard, setSelectedBoard] = useState(null);

    const selectBoard = (board) => {
        setSelectedBoard(board);
    }

    useEffect(() => {
        if (selectedBoard !== null){
            instanca.get("board-pins/"+selectedBoard.id)
                .then(response => {
                    console.log(response.data);
                    setPins(response.data.podaci);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    },[selectedBoard]);

    return (
        <div>

            <div className="text-center mt-3">
                <h1 className="fw-bold">Welcome to Pinterest</h1>
                <p className="text-muted">Here you can find a lot of interesting boards</p>
            </div>

            <Row>
                <Col md={12}>
                    <input type="text" className="form-control" placeholder="Search for boards" onChange={(e) => {
                        let search = e.target.value;

                        if (search === "") return setFilteredPins(data);
                        
                        let filtered = data.filter(board => {
                            return board.title.toLowerCase().includes(search.toLowerCase());
                        });
                        setFilteredPins(filtered);
                    }}/>
                </Col>
            </Row>

            {selectedBoard === null && (<Row>

                {
                    filteredPins && filteredPins.map(board => {
                        return (
                            <Col md={4} xs={12} lg={3} key={board.id}>
                                <Board id={board.id} allowDelete={false} title={board.title} description={board.description} email={board.user.email}
                                       variantNumber={Math.floor(Math.random() * 6)} selectBoard={() => {
                                    selectBoard(board)
                                }}/>
                            </Col>
                        );
                    })
                }
            </Row>)
            }

            {selectedBoard !== null && (
                <div>
                    <h1 className="text-center m-3">{selectedBoard.title}</h1>
                    <p className="text-center m-3">{selectedBoard.description}</p>
                    <p className="text-center m-3">Owned by: {selectedBoard.user.email}</p>
                </div>

            )}

            {selectedBoard !== null && (<><Row>
                    {
                        pins && pins.map(pin => {
                            return (
                                <Col key={pin.id} md={4} xs={12} lg={3}>
                                    <PinCard title={pin.pin_title} description={pin.pin_description} image={pin.image}/>
                                </Col>
                            );
                        })
                    }
                </Row>
                <button className="btn btn-primary mt-3" onClick={() => setSelectedBoard(null)}>Back</button>
                </>
                )
                }
                <hr/>
            {
                person && (
                    <>
                    <h1>User of the month: </h1>
                    <Row>
                        <Col md={8}>
                            <img src={person.picture} alt={person.name} className="img img-thumbnail"/>
                        </Col>
                        <Col md={4}>
                            <h3>{person.name}</h3>
                            <p>{person.description}</p>
                        </Col>

                    </Row>
                    </>
                )
            }
                </div>
            );
            };

            export default Home;
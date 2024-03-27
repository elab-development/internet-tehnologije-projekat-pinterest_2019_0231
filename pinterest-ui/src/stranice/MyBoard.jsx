import React, {useEffect, useState} from 'react';
import instanca from "../axios-instanca/instanca";
import {Col, Row} from "react-bootstrap";
import Board from "../komponente/Board";
import PinCard from "../komponente/PinCard";

const MyBoard = () => {

    const [data, setData] = useState([]);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        let userId = window.sessionStorage.getItem("userId");
        instanca.get("user-boards/"+userId)
            .then(response => {
                console.log(response.data);
                setData(response.data.podaci);
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

            {selectedBoard === null && (<Row>

                {
                    data && data.map(board => {
                        return (
                            <Col md={4} xs={12} lg={3} key={board.id}>
                                <Board id={board.id} allowDelete={true} title={board.title} description={board.description} email={board.user.email}
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

            {selectedBoard !== null && (<Row>
                {
                    pins && pins.map(pin => {
                        return (
                            <Col key={pin.id} md={4} xs={12} lg={3}>
                                <PinCard title={pin.pin_title} description={pin.pin_description} image={pin.image}/>
                            </Col>
                        );
                    })
                }
            </Row>)
            }

            <button className="btn btn-primary mt-3" onClick={() => setSelectedBoard(null)}>Back</button>


        </div>
    );
};

export default MyBoard;
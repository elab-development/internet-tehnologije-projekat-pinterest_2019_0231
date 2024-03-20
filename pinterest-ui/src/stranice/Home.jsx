import React, {useEffect, useState} from 'react';
import instanca from "../axios-instanca/instanca";
import Board from "../komponente/Board";
import {Col, Row} from "react-bootstrap";

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        instanca.get("boards")
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

    return (
        <div>

            <div className="text-center mt-3">
                <h1 className="fw-bold">Welcome to Pinterest</h1>
                <p className="text-muted">Here you can find a lot of interesting boards</p>
            </div>

            { selectedBoard === null && (<Row>

            {
                data && data.map(board => {
                    return (
                        <Col md={4} xs={12} lg={3} key={board.id}>
                            <Board  title={board.title} description={board.description} email={board.user.email} variantNumber={Math.floor(Math.random() * 6)} selectBoard={() => { selectBoard(board)}}/>
                        </Col>
                    );
                })
            }
            </Row> )
            }

            { selectedBoard !== null && (
                <div>
                    <h1 className="text-center m-3">{selectedBoard.title}</h1>
                    <p className="text-center m-3">{selectedBoard.description}</p>
                    <p className="text-center m-3">Owned by: {selectedBoard.user.email}</p>
                    <button className="btn btn-primary" onClick={() => setSelectedBoard(null)}>Back</button>
                </div>
            )
            }

        </div>
    );
};

export default Home;
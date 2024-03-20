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

    return (
        <div>

            <div className="text-center mt-3">
                <h1 className="fw-bold">Welcome to Pinterest</h1>
                <p className="text-muted">Here you can find a lot of interesting boards</p>
            </div>

            <Row>

            {
                data && data.map(board => {
                    return (
                        <Col md={4} xs={12} lg={3} key={board.id}>
                            <Board  title={board.title} description={board.description} email={board.user.email} variantNumber={Math.floor(Math.random() * 6)}/>
                        </Col>
                    );
                })
            }
            </Row>

        </div>
    );
};

export default Home;
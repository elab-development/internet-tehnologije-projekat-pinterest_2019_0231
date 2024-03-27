import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from "react-bootstrap";
import instanca from "../axios-instanca/instanca";

const Board = props => {

    const {title, description, email, variantNumber, selectBoard, allowDelete, id} = props;

    const variants = [
        'primary', 'secondary', 'success', 'danger', 'warning', 'info',
    ];

    const deleteBoard = () => {
        instanca.delete("boards/"+id).then(response => {
            console.log(response.data);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <Card className="m-3" bg={variants[variantNumber]} style={
                {
                    color: "white"
                }

            }>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <hr />
                    <Card.Subtitle className="mb-2">Owned by: {email}</Card.Subtitle>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button onClick={selectBoard} variant="light">Details</Button>
                    {allowDelete && <Button onClick={deleteBoard} className="ms-2" variant="danger">Delete</Button>}
                </Card.Body>
            </Card>
        </>
    );
};

Board.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    variantNumber: PropTypes.number,
    selectBoard: PropTypes.func,
    allowDelete: PropTypes.bool,
    id: PropTypes.number.isRequired
};

export default Board;
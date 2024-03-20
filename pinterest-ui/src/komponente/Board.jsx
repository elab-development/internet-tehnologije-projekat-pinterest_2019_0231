import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from "react-bootstrap";

const Board = props => {

    const {title, description, email, variantNumber, selectBoard} = props;

    const variants = [
        'primary', 'secondary', 'success', 'danger', 'warning', 'info',
    ];

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
    selectBoard: PropTypes.func
};

export default Board;
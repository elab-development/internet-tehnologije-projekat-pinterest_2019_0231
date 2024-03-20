import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";

const PinCard = props => {
    const {title, description, image} = props;

    return (
        <>
            <Card className="m-2">
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

PinCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default PinCard;
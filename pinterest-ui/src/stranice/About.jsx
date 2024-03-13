import React from 'react';
import {Col, Row} from "react-bootstrap";
import nina from "../slike/nina.jpeg";
import mihajlo from "../slike/mihajlo.jpeg";

const About = () => {

    const about = [
        {
            id: 1,
            name: "Nina Andric",
            description: "Nina Andric is a student at the Faculty of Organizational Sciences. She is a student of the forth year of the Software Engineering study program. She is interested in web development and programming in general. She is a beginner in the field of web development and she is eager to learn new things.",
            picture: nina
        },
        {
            id: 2,
            name: "Mihajlo Cosovic",
            description: "Mihajlo Cosovic is a student at the Faculty of Organizational Sciences. He is a student of the forth year of the Software Engineering study program. He is interested in web development and programming in general. He is a beginner in the field of web development and he is eager to learn new things.",
            picture: mihajlo
        },
    ];

    return (
        <div>

            <h1 className="text-center m-3 fw-bold">Something about us!!!</h1>

            {
                about.map((person) => {
                    return (
                        <Row key={person.id}>
                            <Col md={8}>
                                <h3>{person.name}</h3>
                                <p>{person.description}</p>
                            </Col>
                            <Col md={4}>
                                <img src={person.picture} alt={person.name} className="img img-thumbnail"/>
                            </Col>
                        </Row>
                    );
                })
            }
        </div>
    );
};

export default About;
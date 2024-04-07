import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import nina from "../slike/nina.jpeg";
import mihajlo from "../slike/mihajlo.jpeg";
import instanca from "../axios-instanca/instanca";

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

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        instanca.get("https://randomuser.me/api/?results=4")
            .then(response => {
                console.log(response.data);
                setPersons(response.data.results)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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

            {
                persons && (
                    <>
                    
                        <h1>Rest of the team</h1>

                        {
                            persons.map((person) => {
                                return (
                                    <Row key={person.login.uuid}>
                                        <Col md={8}>
                                            <h3>{person.name.first} {person.name.last}</h3>
                                            <p>{person.location.city}</p>
                                        </Col>
                                        <Col md={4}>
                                            <img src={person.picture.large} alt={person.name.first} className="img img-thumbnail"/>
                                        </Col>
                                    </Row>
                                );
                            })
                        }
                    
                    </>
                )
            }
        </div>
    );
};

export default About;
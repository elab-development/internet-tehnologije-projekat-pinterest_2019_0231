import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container} from "react-bootstrap";
import React from "react";
import Navigacija from "./komponente/Navigacija";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./stranice/Home";
import About from "./stranice/About";
import MyBoard from "./stranice/MyBoard";
import Account from "./stranice/Account";

function App() {
  return (
    <>


        <BrowserRouter>
            <Navigacija />
            <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/my-boards" element={<MyBoard />} />
                <Route path="/account" element={<Account />} />
            </Routes>
            </Container>
        </BrowserRouter>
    </>
  );
}

export default App;
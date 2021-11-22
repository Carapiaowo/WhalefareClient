import React, { useState } from 'react';
import generator from "generate-password";
import { Container, Card, Form, Button } from "react-bootstrap";


function Generador() {

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(10);
    const [isLowerCase, setIsLowerCase] = useState(true);
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isNumbers, setIsNumbers] = useState(false);
    const [isSymbols, setIsSymbols] = useState(false);

    const generatePassword = () => {
        const pwd = generator.generate({
            length: length,
            lowercase: isLowerCase,
            uppercase: isUpperCase,
            numbers: isNumbers,
            symbols: isSymbols
        });
        setPassword(pwd);
    }

    return (
        <>

            <Container>
                <Card lg={4} md={6} sm={12} className="right">
                    <Card.Header>Generador de contraseñas</Card.Header>

                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicUser">
                            <Form.Label>Longitud:</Form.Label>
                            <Form.Control type="number"
                                className="input-len form-control"
                                value={length}
                                onChange={e => setLength(e.target.value)}
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <div className='row'>
                                <div className='col'>
                                    <Form.Check.Input type="checkbox" className="mr-1"
                                        checked={isLowerCase}
                                        onChange={() => setIsLowerCase(val => !val)}
                                    />
                                    <Form.Check.Label>{"Minúsculas"}</Form.Check.Label>
                                    <br />
                                </div>
                                <div className='col'>
                                    <Form.Check.Input type="checkbox"
                                        className="mr-1"
                                        checked={isNumbers}
                                        onChange={() => setIsNumbers(val => !val)}
                                    />
                                    <Form.Check.Label>{"Números"}</Form.Check.Label>
                                    <br />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <Form.Check.Input type="checkbox"
                                        className="mr-1"
                                        checked={isUpperCase}
                                        onChange={() => setIsUpperCase(val => !val)}
                                    />
                                    <Form.Check.Label>{"Mayúsculas"}</Form.Check.Label>
                                    <br />
                                </div>
                                <div className='col'>
                                    <Form.Check.Input type="checkbox"
                                        className="mr-1"
                                        checked={isSymbols}
                                        onChange={() => setIsSymbols(val => !val)}
                                    />
                                    <Form.Check.Label>{"Símbolos"}</Form.Check.Label>
                                </div>
                            </div>

                            <small>Nota: Seleccionar al menos un criterio.</small>
                        </div>


                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" className="btn" value="Generate Password" onClick={generatePassword}>Generar</Button>
                            <Card.Footer>
                                {password}
                            </Card.Footer>
                        </div>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default Generador;
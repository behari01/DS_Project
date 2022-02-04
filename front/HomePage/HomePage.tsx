import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'

import '../style/styleFront.css'


const LiteraturaPage = () => (
    <div>
        <div className="all">

            <div className="hList">
                <li><Link to="/" style={{ textDecoration: 'none' , color: 'white' }}>Home</Link> </li>
                <li><Link to="/sesionet" style={{ textDecoration: 'none' , color: 'white' }}>Klasat</Link></li>
                <li><Link to="/books" style={{ textDecoration: 'none' , color: 'white' }}>Dashboard</Link></li>
                <li><Link to="/literatura" style={{ textDecoration: 'none' , color: 'white' }}>Literatura</Link></li>
                <li><Link to="/" style={{ textDecoration: 'none' , color: 'white' }}>Kycu</Link></li>
            </div>


            <div className="boxi">
                <div className="btn">
                    <Button color='orange'>Kycu si student</Button>
                    <Button color='yellow'>Kycu si mesimdhenes</Button>
                    <Button color='olive'>Kycu si drejtor</Button>
                </div>


            </div>
            <div className="kartat">

                <div className="kartat1">
                    <Card >
                        <Image src='/assets/video.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>VIDEO EDUKIMI</Card.Header>
                            <Card.Description>
                                Kliko buttonin per video te ndryshme edukimi
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button positive style={{ width: "100%" }}>VIDEO EDUKIMI</Button>
                        </Card.Content>
                    </Card>
                </div>
                <div className="kartat2">
                    <Card >
                        <Image src='/assets/klasatvirtuale.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>Klasat Virtuale</Card.Header>
                            <Card.Description>
                                Kliko buttonin per tu kycur ne klasa
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button positive style={{ width: "100%" }}><Link  to="/sesionet" style={{ textDecoration: 'none' , color: 'white' }}>Klasat Virtuale</Link></Button>
                        </Card.Content>
                    </Card>
                </div>
                <div className="kartat3">
                    <Card >
                        <Image src='/assets/libra.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>Literatura</Card.Header>
                            <Card.Description>
                                Kliko buttonin per te pare literaturen 
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button positive style={{ width: "100%" }}>Literatura</Button>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>

        <div className="footer">

            <h3>Te drejtat e rezervuara nga @E-Ditari</h3>

        </div>
    </div>



)

export default LiteraturaPage
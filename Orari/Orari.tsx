import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


export default function Orari(){
    const myStyle = {
        marginLeft: "7em",
        marginTop: "2em"
      };

    return(
        <Container style={myStyle}>
            <h2>Orari Pageeeeeeeeeeeeeeeeeeeeeeeee</h2>
            <h3>GO to <Link to='/books'> Ngarko Librat </Link></h3>
        </Container>
    )
}
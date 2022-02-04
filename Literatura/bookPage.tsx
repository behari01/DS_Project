import { Book } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import avatar from '../Literatura/avatar.png'
import SearchBook from '../Books/SearchBook/searchBook';
import '../front/style/styleFront.css'




export default observer(function BookListR() {
    const [target, setTarget] = useState('');

    const { mesimdhenesiStore } = useStore();

    useEffect(() => {
        mesimdhenesiStore.removeBooks();
        mesimdhenesiStore.loadBooks();
    }, [mesimdhenesiStore]);

    return (
        <div>
            <div className="hList">
                <li><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link> </li>
                <li><Link to="/sesionet" style={{ textDecoration: 'none', color: 'white' }}>Klasat</Link></li>
                <li><Link to="/books" style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link></li>
                <li><Link to="/literatura" style={{ textDecoration: 'none', color: 'white' }}>Literatura</Link></li>
                <li><Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Kycu</Link></li>
            </div>

            <div className='searchLiteratura'>
            <br></br>
            <SearchBook/>
            </div>

            <div className="kartatLiteratura">

                <Card.Group itemsPerRow={4} >
                    {mesimdhenesiStore.books.map((book) => (

                        <Card.Content key={book.id} className="kartLiteratura">
                            <img src={avatar} />
                            <div className="inputKart">
                                <Card.Header>Autori: {book.autori}</Card.Header>
                                <Card.Header>Titulli: {book.title}</Card.Header>
                                <Card.Description>Klasa: {book.category}</Card.Description>
                                <Card.Description>Pershkrimi: {book.descriptionB}</Card.Description>   

                                    <Button  inverted color='green' size="large" style={{width:'222px'}}>
                                        Shkarko
                                    </Button>
                            </div>
                        </Card.Content>
                    ))}
                </Card.Group>
            </div>
        </div>
    )
})


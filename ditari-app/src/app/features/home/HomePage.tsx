import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Card, Container, Menu, Icon, Segment, Statistic } from 'semantic-ui-react';
import agent from '../../app/API/agent';
import { Nxenesi } from '../../app/models/nxenesi';
import { useStore } from '../../app/stores/store';

export default observer(function HomePage(){

    async function numri(){
        return (await agent.Nxenesit.list()).length;
    }

    function getNumri(){
        numri().then(function(result) {
        })
    }
    
    const {nxenesiUserStore} = useStore();

    return(
        <div className="front-main">
            <Container style={{ marginTop: '-5em', marginRight: '10em' }}>
                <Segment inverted>
                    <Menu inverted secondary>
                        <Menu.Item as={NavLink} to='/'>
                            <Icon.Group size='small'>
                                <Icon name='home' />
                            </Icon.Group>
                            HOMEPAGE
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/about'>
                            <Icon.Group size='small'>
                                <Icon name='question' />
                            </Icon.Group>
                            RRETH NESH
                        </Menu.Item>
                    </Menu>
                </Segment>
                <img src="/assets/front.jpg" height='632px' />

                <div className="front-pageG">
                    <h1>Do what you have to do until you can do what you want to do.</h1>
                    <Button as={Link} to='/nxenesiLogin' size='huge' color='blue' inverted>LOGIN AS STUDENT</Button><br></br>
                    <Button as={Link} to='/mesimdhenesiLogin' size='huge' color='red' inverted>LOGIN AS TEACHER</Button>
                </div>

            </Container>
        </div>
    )
})

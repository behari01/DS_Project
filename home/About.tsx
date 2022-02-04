import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Card, Container, Menu, Icon, Segment, Statistic } from 'semantic-ui-react';
import agent from '../../app/API/agent';
import { Nxenesi } from '../../app/models/nxenesi';
import { useStore } from '../../app/stores/store';
import Librat from '../Books/dashboard/Librat';

export default observer(function About(){

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
               <div className="front-pageG">
               <h1>RRETH NESH</h1><br></br><br></br>
               <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
                </div>

            </Container>
        </div>
    )
})

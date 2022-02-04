import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Card, Container, Menu, Icon, Segment, Statistic } from 'semantic-ui-react';
import agent from '../../app/API/agent';
import { Nxenesi } from '../../app/models/nxenesi';
import { useStore } from '../../app/stores/store';
import Librat from '../Books/dashboard/Librat';

export default observer(function LiteraturaHome(){

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
        
               <Librat/>
               <div className="front-pageG">
                    <h1></h1>
                </div>

        </div>
    )
})

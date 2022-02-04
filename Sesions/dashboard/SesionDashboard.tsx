import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {  Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import AddSesion from '../AddSesion/AddSesion';
import SesionListR from './SesionListR';


export default observer(function SesionDashboard(){

    const {mesimdhenesiStore} = useStore();
  
    const {nxenesiUserStore} = useStore();
    useEffect(() => {
     mesimdhenesiStore.removeSesions();
     mesimdhenesiStore.loadSesions();
    }, [mesimdhenesiStore]);

    if (mesimdhenesiStore.loadingInitial) return <LoadingComponent content='Duke u ngarkuar...' />
    
    return(
        <Grid>
            <Grid.Column width='16'>
                
            <SesionListR />
            {nxenesiUserStore.roli==1?(<AddSesion />):(<h1></h1>)}
            </Grid.Column>
        </Grid>
    )
})
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {  Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import AddAnkes from '../AddAnkes/AddAnkes';
import AnkesListR from './AnkesListR';
import SearchAnkes from '../SearchAnkes/searchAnkes';


export default observer(function AnkesDashboard(){

    const {mesimdhenesiStore} = useStore();
  

    useEffect(() => {
     mesimdhenesiStore.removeAnkesat();
     mesimdhenesiStore.loadAnkesat();
    }, [mesimdhenesiStore]);

    if (mesimdhenesiStore.loadingInitial) return <LoadingComponent content='Duke u ngarkuar...' />
    
    return(
        <Grid>
            <Grid.Column width='16'>
            <SearchAnkes/>
            <AnkesListR />
            <AddAnkes />
            </Grid.Column>
        </Grid>
    )
})
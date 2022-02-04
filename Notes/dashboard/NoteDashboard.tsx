import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {  Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import AddNote from '../AddNote/AddNote';
import SearchNote from '../SearchNote/searchNote';
import NoteListR from './NoteListR';
import '../../front/style/styleFront.css'


export default observer(function NoteDashnoard(){

    const {mesimdhenesiStore} = useStore();
  

    useEffect(() => {
     mesimdhenesiStore.removeNotes();
     mesimdhenesiStore.loadNotes();
    }, [mesimdhenesiStore]);

    if (mesimdhenesiStore.loadingInitial) return <LoadingComponent content='Duke u ngarkuar...' />
    
    return(
        <Grid>
            
            <AddNote  /> 
           
            <Grid.Column width='16'>
            <NoteListR />
            </Grid.Column>
        </Grid>
    )
})
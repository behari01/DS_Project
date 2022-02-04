import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import NoteDashboard from '../../Notes/dashboard/NoteDashboard';
import NoteListR from '../../Notes/dashboard/NoteListR';
export default observer(function NxenesiDashboard(){
    
    const{mesimdhenesiStore} = useStore();
    const {createNxenesi, loading} = mesimdhenesiStore;
    

    useEffect(() => {
      mesimdhenesiStore.removeNotes();
      mesimdhenesiStore.loadNotes();
     }, [mesimdhenesiStore]);
 
  
    const myStyle= {
      marginLeft: "7em",
      marginTop:"2em"
    };
  
    if(mesimdhenesiStore.loadingInitial) return <LoadingComponent content='Duke u ngarkuar...' />

    return(
        <Grid>
           <Grid.Column width='16'>
            <NoteListR />
            </Grid.Column>
        </Grid>
    )
})
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import AddAccount from '../AddAccount/AddAccount';
import AddNxenesi from '../AddNxenesi/AddNxenesi';
import SearchNxenesi from '../SearchNxenesi/SearchNxenesi';
import NxenesitList from './NxenesitList';

export default observer(function ActivityDashboard(){
    
    const{mesimdhenesiStore} = useStore();
    const {createNxenesi, loading} = mesimdhenesiStore;
    

    useEffect(() => {
      mesimdhenesiStore.removeNxenesit();
      mesimdhenesiStore.loadNxenesit();
    }, [mesimdhenesiStore])
  
    const myStyle= {
      marginLeft: "7em",
      marginTop:"2em"
    };
  
    if(mesimdhenesiStore.loadingInitial) return <LoadingComponent content='Duke u ngarkuar...' />

    return(
        <Grid>
            <Grid.Column width='16'>
            <h4>Kërko nxënësit:  </h4><SearchNxenesi/>
            <NxenesitList/>
            
            <AddAccount/>
            </Grid.Column>
        </Grid>
    )
})
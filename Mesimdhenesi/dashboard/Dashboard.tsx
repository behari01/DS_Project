import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
export default observer(function Dashboard(){
    
    const{mesimdhenesiStore} = useStore();
    const { nxenesiUserStore } = useStore();
    const { user } = nxenesiUserStore;
    
    useEffect(() => {
      mesimdhenesiStore.removeNxenesit();
      mesimdhenesiStore.loadNxenesit();
      mesimdhenesiStore.removeAnkesat();
      mesimdhenesiStore.loadAnkesat();
      mesimdhenesiStore.removeSesions();
      mesimdhenesiStore.loadSesions();
    }, [mesimdhenesiStore])
  
    const myStyle= {
      marginLeft: "7em",
      marginTop:"2em"
    };

    if(mesimdhenesiStore.loadingInitial) return <LoadingComponent content='Duke u ngarkuar...' />

    return(
      
        <Grid>

          <h2>Përshendetje, {user?.emri}</h2>
          
        <Card.Group>
          <Card>
            <Card.Content>
           
              <Card.Header>{mesimdhenesiStore.nxenesit.length}</Card.Header>
              <Card.Meta></Card.Meta>
              <Card.Description>
                 <strong>Numri i nxënësve të regjistruar</strong>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>{mesimdhenesiStore.sesions.length}</Card.Header>
              <Card.Meta></Card.Meta>
              <Card.Description>
                 <strong>Numri i sesioneve te krijuar</strong>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>{mesimdhenesiStore.ankesat.length}</Card.Header>
              <Card.Meta></Card.Meta>
              <Card.Description>
                 <strong>Numri i ankesave</strong>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
        </Grid>
    )
})
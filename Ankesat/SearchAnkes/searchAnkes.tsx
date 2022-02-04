import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, FormField, Input } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'


  export default observer(function SearchAnkes(){

    const {mesimdhenesiStore} = useStore();
    const {filterAnkesat,loading,removeAnkesat} = mesimdhenesiStore;
    
    const[selectedAnkes] = useState();

    const initialState = selectedAnkes ??{
      emri: '',
      arsyja: '',
    }

    const [ankes, setAnkes] = useState(initialState);
    
    function handleSubmit(){
        removeAnkesat();
        filterAnkesat(ankes);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setAnkes({...ankes,[name]:value})
      }

    return(
        <Form onSubmit={handleSubmit} autoComplete='off'>
          
        <Form.Group widths='equal' style={{width: '200px'}}>
    
            <Form.Input icon='users' iconPosition='left' value={ankes.emri} name='emri' onChange={handleInputChange} placeholder='Emri i nxenesit...' />
           
            <Button positive type='submit' color='green' content='Kërko'/>
        
        </Form.Group>
        </Form>
    )
  })
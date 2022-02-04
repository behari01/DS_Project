import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, FormField, Icon, Input } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'


  export default observer(function SearchNxenesi(){

    const {mesimdhenesiStore} = useStore();
    const {filterNxenesit,loading,removeNxenesit} = mesimdhenesiStore;
    
    const[selectedNxenesi] = useState();

    const initialState = selectedNxenesi ??{
      emri: '',
      mbiemri: '',
      datelindja: '',
      rruga: '',
      qyteti: '',
      numriKontaktues: '',
      nrLiberAme: ''
    }

    const [nxenesi, setNxenesi] = useState(initialState);
    
    function handleSubmit(){
        removeNxenesit();
        filterNxenesit(nxenesi);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setNxenesi({...nxenesi,[name]:value})
      }

    return(
        <Form onSubmit={handleSubmit} autoComplete='off'>
          
        <Form.Group widths='equal' style={{width: '240px'}}>
    
            <Form.Input icon='users' iconPosition='left' value={nxenesi.emri} name='emri' onChange={handleInputChange} placeholder='Emri...' />
            <Form.Input icon='users' iconPosition='left' value={nxenesi.mbiemri} name='mbiemri' onChange={handleInputChange} placeholder='Mbiemri...' />
            <Button positive type='submit' color='green' content='Kërko'/>
            <Button color='red' content='X'/>
        
        </Form.Group>
        </Form>
    )
  })

import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, FormField, Input } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'


  export default observer(function SearchNote(){

    const {mesimdhenesiStore} = useStore();
    const {filterNotes,loading,removeNotes} = mesimdhenesiStore;
    
    const[selectedNote] = useState();

    const initialState = selectedNote ??{
      title: '',
      descriptionN: '',
    }

    const [note, setNote] = useState(initialState);
    
    function handleSubmit(){
        removeNotes();
        filterNotes(note);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setNote({...note,[name]:value})
      }

    return(
        <Form onSubmit={handleSubmit} autoComplete='off'>
          
        <Form.Group widths='equal' style={{width: '200px'}}>
    
            <Form.Input icon='users' iconPosition='left' value={note.title} name='title' onChange={handleInputChange} placeholder='Titulli...' />
         
            <Button positive type='submit' color='green' content='Kërko'/>
        
        </Form.Group>
        </Form>
    )
  })

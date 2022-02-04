import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, FormField, Input } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'


  export default observer(function SearchBook(){

    const {mesimdhenesiStore} = useStore();
    const {filterBooks,loading,removeBooks} = mesimdhenesiStore;
    
    const[selectedBook] = useState();

    const initialState = selectedBook ??{
      autori: '',
      title: '',
      category: '',
      descriptionB: '',
    }

    const [book, setBook] = useState(initialState);
    
    function handleSubmit(){
        removeBooks();
        filterBooks(book);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setBook({...book,[name]:value})
      }

    return(
        <Form onSubmit={handleSubmit} autoComplete='off'>
          
        <Form.Group widths='equal' style={{width: '200px'}}>
    
            <Form.Input icon='users' iconPosition='left' value={book.autori} name='autori' onChange={handleInputChange} placeholder='Autori...' />
            <Form.Input icon='users' iconPosition='left' value={book.title} name='title' onChange={handleInputChange} placeholder='Titulli...' />
            <Button positive type='submit' color='green' content='Kërko'/>
        
        </Form.Group>
        </Form>
    )
  })

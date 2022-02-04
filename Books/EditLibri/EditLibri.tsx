import React, { ChangeEvent, useState } from 'react';
import { Button, Modal, Form, Segment, Header } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import { Book } from '../../../app/models/book';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MyTextArea from '../../../app/common/form/MyTextArea';

interface Props{
  book: Book | undefined;
}


export default function EditBook({book: selectedBook}: Props){
    const[open, setOpen] = React.useState(false);
    const{mesimdhenesiStore} = useStore();
    const{updateBook} = mesimdhenesiStore;

    const initialState = selectedBook ?? {
      id: '',
      autori: '',
      title: '',
      category: '',
      descriptionB: '',
    }
    
    const validationSchema = Yup.object({
      autori: Yup.string().required('Sheno autorin'),
      title: Yup.string().required('Sheno titullin'),
      category: Yup.string().required('Sheno klasen'),
      descriptionB: Yup.string().required('Sheno pershkrimin')
    })


    const [book, setBook] = useState(initialState);

    function handleFormSubmit(book: Book){
      updateBook(book);
      setOpen(false);
      alert('Successfully edited!');
    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //   const {name, value} = event.target;
    //   setBook({...book,[name]:value})
    // }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='orange'>EDIT</Button>}
    >
    <Modal.Header>EDIT LIBRI</Modal.Header>
      <Segment clearing>

      

          <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={book}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit ,isValid, isSubmitting , dirty }) => (


            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

              <Header content='Autori' sub color='teal' />
              <MyTextInput name='autori' placeholder='Autori' />

              <Header content='Titulli' sub color='teal' />
              <MyTextInput placeholder='Title' name='title' />

              <Header content='Klasa' sub color='teal' />
              <MySelectInput options={categoryOptions} placeholder='Klasa' name='category' />

              <Header content='Pershkrimi' sub color='teal' />
              <MyTextArea rows={3} placeholder='Pershkrimi' name='descriptionB' />
              <Button color='black' onClick={() => setOpen(false)}>
          CLOSE
        </Button>
        <Button
        disabled={isSubmitting || !dirty || !isValid}
        positive type='submit'  content='Submit' onClick={() => setOpen(true)}/> 
          </Form>
          )}
          
          </Formik>
      </Segment>
      <Modal.Actions>
        
      </Modal.Actions>
    </Modal>
  )
}
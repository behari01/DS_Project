import React, { ChangeEvent, useState } from 'react';
import { Button, Modal, Form, Segment, Header } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import { Note } from '../../../app/models/note';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MyTextArea from '../../../app/common/form/MyTextArea';

interface Props{
  note: Note | undefined;
}


export default function EditNote({note: selectedNote}: Props){
    const[open, setOpen] = React.useState(false);
    const{mesimdhenesiStore} = useStore();
    const{updateNote} = mesimdhenesiStore;

    const initialState = selectedNote ?? {
      id: '',
      title: '',
      descriptionN: '',
    }
    
    const validationSchema = Yup.object({
   
      title: Yup.string().required('Sheno titullin'),
   
      descriptionN: Yup.string().required('Sheno pershkrimin')
    })


    const [note, setNote] = useState(initialState);

    function handleFormSubmit(note: Note){
      updateNote(note);
      setOpen(false);
      alert('Successfully edited!');
    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //   const {name, value} = event.target;
    //   setNote({...note,[name]:value})
    // }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='orange'>EDIT</Button>}
    >
    <Modal.Header>EDIT SHENIMIN</Modal.Header>
      <Segment clearing>

      

          <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={note}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit ,isValid, isSubmitting , dirty }) => (


            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

        
              <Header content='Titulli' sub color='teal' />
              <MyTextInput placeholder='Title' name='title' />

    

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
import { Formik, Form, } from 'formik';
import React, { useState } from 'react';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import { Note } from '../../../app/models/note';
import { useHistory } from 'react-router';


export default function AddNote() {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const [selectedNote] = useState();

  const { mesimdhenesiStore } = useStore();
  const { createNote, loading } = mesimdhenesiStore;

  const initialState = selectedNote ?? {
    title: '',
    descriptionN: '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Sheno titullin'),
    descriptionN: Yup.string().required('Sheno pershkrimin')
  })

  const [note, setNote] = useState(initialState);

  function handleFormSubmit(note: Note) {
    createNote(note).then(() => history.push(`/`)).then(() => history.push(`/mesimdhenesi/notes`));
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
      trigger={<Button  circular icon color='blue' >KRIJO NOTES</Button>}
    >
      <Modal.Header>SHTO LIBRI</Modal.Header>
      <Segment clearing>

        <Header content='Detajet rreth shenimit' sub color='teal' size='huge'/> <br></br>

        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={note}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (


            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

              <MyTextInput placeholder='Title' name='title' />
              <MyTextArea rows={3} placeholder='Pershkrimi' name='descriptionN' />
              <Button color='black' onClick={() => setOpen(false)}>
                CLOSE
      </Button>
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                positive type='submit' content='Submit' onClick={() => setOpen(true)} />
            </Form>

          )}

        </Formik>
      </Segment>
      <Modal.Actions>

      </Modal.Actions>
    </Modal>
  )
}
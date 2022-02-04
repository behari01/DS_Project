import { Formik, Form, } from 'formik';
import React, { useState } from 'react';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import { Book } from '../../../app/models/book';
import { useHistory } from 'react-router';


export default function AddLibri() {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const [selectedBook] = useState();

  const { mesimdhenesiStore } = useStore();
  const { createBook, loading } = mesimdhenesiStore;

  const initialState = selectedBook ?? {
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

  function handleFormSubmit(book: Book) {
    createBook(book).then(() => history.push(`/`)).then(() => history.push(`/books`));
  }
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue'>SHTO LIBRIN</Button>}
    >
      <Modal.Header>SHTO LIBRI</Modal.Header>
      <Segment clearing>

        <Header content='Detajet rreth librit' sub color='teal' size='huge'/> <br></br>

        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={book}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (


            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

              <MyTextInput name='autori' placeholder='Autori' />
              <MyTextInput placeholder='Title' name='title' />
              <MySelectInput options={categoryOptions} placeholder='Klasa' name='category' />
              <MyTextArea rows={3} placeholder='Pershkrimi' name='descriptionB' />
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
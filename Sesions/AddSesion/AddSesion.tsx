import { Formik, Form, } from 'formik';
import React, { useState } from 'react';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions, categorySesion } from '../../../app/common/form/options/categoryOptions';
import { useHistory } from 'react-router';
import { Sesion } from '../../../app/models/sesion';


export default function AddSesion() {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const [selectedSesion] = useState();

  const { mesimdhenesiStore } = useStore();
  const { createSesion, loading } = mesimdhenesiStore;

  const initialState = selectedSesion ?? {
    autori: '',
    lenda: '',
    klasa: '',
    linku: '',
  }

  const validationSchema = Yup.object({
    autori: Yup.string().required('Sheno autorin'),
    lenda: Yup.string().required('Sheno lenden'),
    klasa: Yup.string().required('Sheno klasen'),
    linku: Yup.string().required('Sheno linku')
  })

  const [sesion, setSesion] = useState(initialState);

  function handleFormSubmit(sesion: Sesion) {
    createSesion(sesion).then(() => history.push(`/`)).then(() => history.push(`/mesimdhenesi/sesions`));
  }

  // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
  //   const {name, value} = event.target;
  //   setSesion({...sesion,[name]:value})
  // }



  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon='add'  content='Krijo sesionin' color='blue'/>}
    >
      <Modal.Header>KRIJO LINKUN</Modal.Header>
      <Segment clearing>

        <Header content='Detajet rreth sesionit' sub color='teal' size='huge'/> <br></br>

        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={sesion}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (


            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
              
              <MyTextInput name='autori' placeholder='Autori' />
              <MySelectInput options={categorySesion} placeholder='Lenda' name='lenda' />
              <MySelectInput options={categoryOptions} placeholder='Klasa' name='klasa' />
              <MyTextArea rows={3} placeholder='Linku' name='linku' />
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
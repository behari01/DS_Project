import React, { ChangeEvent, useState } from 'react';
import { Button, Modal, Form, Segment, Header } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions, categorySesion } from '../../../app/common/form/options/categoryOptions';
import { Sesion } from '../../../app/models/sesion';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MyTextArea from '../../../app/common/form/MyTextArea';

interface Props{
  sesion: Sesion | undefined;
}


export default function EditSesion({sesion: selectedSesion}: Props){
    const[open, setOpen] = React.useState(false);
    const{mesimdhenesiStore} = useStore();
    const{updateSesion} = mesimdhenesiStore;

    const initialState = selectedSesion ?? {
        autori: '',
        lenda: '',
        klasa: '',
        linku: '',
      }
    
      const validationSchema = Yup.object({
        autori: Yup.string().required('Sheno autorin'),
        klasa: Yup.string().required('Sheno klasan'),
        lenda: Yup.string().required('Sheno lenden'),
        linku: Yup.string().required('Sheno linkun')
      })


    const [sesion, setSesion] = useState(initialState);

    function handleFormSubmit(sesion: Sesion){
      updateSesion(sesion);
      setOpen(false);
      alert('Successfully edited!');
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
      trigger={<Button color='orange'>EDIT</Button>}
    >
    <Modal.Header>EDIT LINKU</Modal.Header>
      <Segment clearing>

      

          <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={sesion}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit ,isValid, isSubmitting , dirty }) => (


            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

              <Header content='Autori' sub color='teal' />
              <MyTextInput name='autori' placeholder='Autori' />

              <Header content='Lenda' sub color='teal' />
              <MySelectInput options={categorySesion} placeholder='Lenda' name='lenda' />

              <Header content='Klasa' sub color='teal' />
              <MySelectInput options={categoryOptions} placeholder='Klasa' name='klasa'/>

              <Header content='Linku' sub color='teal' />
              <MyTextArea rows={3} placeholder='Linku' name='linku' />

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
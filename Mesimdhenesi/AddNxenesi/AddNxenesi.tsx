import { Formik, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Button, FormField, Header, Label, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Nxenesi } from '../../../app/models/nxenesi';
import { UserFormValues } from '../../../app/models/user';

export default observer(function AddNxenesi(){
    const history = useHistory();
    const[open, setOpen] = React.useState(false);
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

    const registerNxenesiX = {
      displayName: '',
      username: '',
      email: '',
      password: '',
      error: null
  }

  

    const validationSchema = Yup.object({
      emri: Yup.string().required('Emri nuk duhet te jete i zbraset'),
      mbiemri: Yup.string().required('Mbiemri nuk duhet te jete i zbraset'),
      datelindja: Yup.string().required('Datelindja nuk duhet te jete e zbraset'),
      rruga: Yup.string().required('Rruga nuk duhet te jete e zbraset'),
      qyteti: Yup.string().required('Qyteti nuk duhet te jete i zbraset'),
      numriKontaktues: Yup.string().required('Numri kontaktues nuk duhet te jete i zbraset'),
      nrLiberAme: Yup.string().required('Numri i librit ame nuk duhet te jete i zbraset')
    })

    const [nxenesi, setNxenesi] = useState(initialState);
    const [registerNxenesi] = useState(registerNxenesiX);

    const {mesimdhenesiStore,nxenesiUserStore} = useStore();
    const {createNxenesi, loading} = mesimdhenesiStore

    function handleFormSubmit(nxenesi: Nxenesi){
      createNxenesi(nxenesi).then(() => history.push(`/`)).then(() => history.push(`/mesimdhenesi/nxenesit`));
    }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue'>ADD</Button>}
    >
    <Modal.Header>SHTO NXENESIN</Modal.Header>
      <Segment clearing>
        <Header content='Nxenesi Details' sub color='teal'/>
        <Formik validationSchema={validationSchema} initialValues={nxenesi} onSubmit={(x) => handleFormSubmit(x)}>
          {({handleSubmit, isValid, isSubmitting, dirty}) => (
               <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
              
               <MyTextInput name='emri' placeholder='emri' />
           
               <MyTextInput placeholder='Mbiemri' name='mbiemri' />
             
               <MyTextInput type='date' placeholder='Datelindja' name='datelindja'/>
               
               <MyTextInput placeholder='Rruga' name='rruga'/>
               
               <MyTextInput placeholder='Qyteti' name='qyteti'/>
               
               <MyTextInput placeholder='Numri kontaktues' name='numriKontaktues'/>
               
               <MyTextInput placeholder='Nr. ne liber ame' name='nrLiberAme'/>
              
               <Button color='black' onClick={() => setOpen(false)}>MBYLL</Button>
              <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} positive type='submit' content='SHTO'/> 
           </Form>

          )}
        </Formik>
         
      </Segment>
      <Modal.Actions>
        
      </Modal.Actions>
    </Modal>
  )
})
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, Form, Segment, Header } from 'semantic-ui-react';
import { Nxenesi } from '../../../app/models/nxenesi';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';


interface Props{
  nxenesi: Nxenesi | undefined;
}


export default observer(function EditNxenesi({nxenesi: selectedNxenesi }: Props){
    const[open, setOpen] = React.useState(false);
    const history = useHistory();
    const {mesimdhenesiStore} = useStore();

    const {updateNxenesi, loading} = mesimdhenesiStore;

    const initialState = selectedNxenesi ?? {
      nxenesiID: '',
      emri: '',
      mbiemri: '',
      datelindja: '',
      rruga: '',
      qyteti: '',
      numriKontaktues: '',
      nrLiberAme: '',
      photo: '',
      email: '',
      prindi: 1,
      klasaID: 1
    }

    const validationSchema = Yup.object({
      emri: Yup.string().required('Emri nuk duhet te jete i zbraset'),
      mbiemri: Yup.string().required('Mbiemri nuk duhet te jete i zbraset'),
      datelindja: Yup.string().required('Datelindja nuk duhet te jete e zbraset'),
      rruga: Yup.string().required('Rruga nuk duhet te jete e zbraset'),
      qyteti: Yup.string().required('Qyteti nuk duhet te jete i zbraset'),
      numriKontaktues: Yup.string().required('Numri kontaktues nuk duhet te jete i zbraset')
    })


    const [nxenesi] = useState(initialState);

    function handleFormSubmit(nxenesi: Nxenesi){
      updateNxenesi(nxenesi).then(() => history.push(`/`)).then(() => history.push(`/mesimdhenesi/nxenesit`));;
    }

    function datess(x: string){
      return x.substring(0,10);
    }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='orange'>EDIT</Button>}
    >
    <Modal.Header>EDIT STUDENT</Modal.Header>
    <Segment clearing>
        <Header content='Nxenesi Details' sub color='teal'/>
        <Formik validationSchema={validationSchema} initialValues={nxenesi} onSubmit={values => handleFormSubmit(values)}>
          {({handleSubmit, isValid, isSubmitting, dirty}) => (
               <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
              
               <MyTextInput name='emri' placeholder='emri' />
           
               <MyTextInput placeholder='Mbiemri' name='mbiemri' />
             
               <MyTextInput type='date' placeholder='Datelindja' value={datess(nxenesi.datelindja)} name='datelindja'/>
               
               <MyTextInput placeholder='Rruga' name='rruga'/>
               
               <MyTextInput placeholder='Qyteti' name='qyteti'/>
               
               <MyTextInput placeholder='Numri kontaktues' name='numriKontaktues'/>
              
               <Button color='black' onClick={() => setOpen(false)}>MBYLL</Button>
              <Button loading={loading} positive type='submit' content='NDRYSHO'/> 
           </Form>

          )}
        </Formik>
         
      </Segment>
      <Modal.Actions>
        
      </Modal.Actions>
    </Modal>
  )
})
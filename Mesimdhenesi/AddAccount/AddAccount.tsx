import { observer } from 'mobx-react-lite';
import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Nxenesi } from '../../../app/models/nxenesi';
import RegisterForm from '../../nxenesitUsers/RegisterForm';

export default observer(function AddAccount(){
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
         <RegisterForm/>
      </Segment>
      <Modal.Actions>
        
      </Modal.Actions>
    </Modal>
  )
})
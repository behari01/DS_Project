import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Header, Modal, Segment, Form, Dropdown } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import { Ankes } from '../../../app/models/ankes';
import { useHistory } from 'react-router';


export default function AddAnkes() {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const [selectedAnkes] = useState();

  const { mesimdhenesiStore } = useStore();
  const { createAnkes, loading } = mesimdhenesiStore;

  const initialState = selectedAnkes ?? {
    emri: '',
    arsyja: '',
  }

  const validationSchema = Yup.object({
    arsyja: Yup.string().required('Sheno arsyjen'),
  })

  const [ankes, setAnkes] = useState(initialState);

  function handleFormSubmit(ankes: Ankes) {
    createAnkes(ankes).then(() => history.push(`/`)).then(() => history.push(`/mesimdhenesi/ankesat`));
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button circular icon color='blue'>SHTO ANKES</Button>}
    >
      <Modal.Header style={{ backgroundColor: 'teal', color: 'white' }}>SHTO ANKESEN</Modal.Header>
      <Segment>

        <Header content='Detajet rreth ankesave' sub color='teal' size='huge' /> <br></br>

        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={ankes}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (


            <Form onSubmit={handleSubmit} autoComplete='off'>
              <MyTextInput name='emri' placeholder='Emri Nxenesit' />
              <MyTextArea rows={3} placeholder='Arsyja' name='arsyja' />
              <Button color='red' onClick={() => setOpen(false)}>
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
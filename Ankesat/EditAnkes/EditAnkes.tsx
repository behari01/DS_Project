import React, { ChangeEvent, useState } from 'react';
import { Button, Modal, Form, Segment, Header  } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import { Book } from '../../../app/models/book';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Ankes } from '../../../app/models/ankes';

interface Props{
  ankes: Ankes | undefined;
}


export default function EditAnkes({ankes: selectedAnkes}: Props){
    const[open, setOpen] = React.useState(false);
    const{mesimdhenesiStore} = useStore();
    const{updateAnkes} = mesimdhenesiStore;

    const initialState = selectedAnkes ?? {
      id: '',
      emri: '',
      arsyja: '',
    }
    
    const validationSchema = Yup.object({
      emri: Yup.string().required('Sheno emrin'),
      arsyja: Yup.string().required('Sheno arsyjen'),
    })


    const [book, setBook] = useState(initialState);

    function handleFormSubmit(ankes: Ankes){
      updateAnkes(ankes);
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
    <Modal.Header>EDIT ANKESEN</Modal.Header>
      <Segment inverted>

      

          <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={book}
          onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit ,isValid, isSubmitting , dirty }) => (


            <Form inverted onSubmit={handleSubmit} autoComplete='off'>

              <Header content='Emri' sub color='teal' />
              <MyTextInput name='emri' placeholder='Emri' />

              <Header content='Arsyeja' sub color='teal' />
              <MyTextInput placeholder='Arsyeja' name='arsyja' />

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
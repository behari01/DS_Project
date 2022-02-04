import { profile } from 'console';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Modal, Form, Segment, Header, Input, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Profile } from '../../app/models/user';
import { useStore } from '../../app/stores/store';


export default observer(function ProfileDetails(){
    const[open, setOpen] = React.useState(false);
    const history = useHistory();
    const {nxenesiUserStore} = useStore();

    function datess(x: string){
      return x.substring(0,10);
    }

  return (
    <Segment>
      <Form className='profile' size='large' key='large'>
        <Header as='h2' content='PROFILI IM' color='red' textAlign='center' />
        
        <Form.Field inline>
        <Input label='Emri' name='emri' placeholder='Emri' value={nxenesiUserStore.emri}/>
        </Form.Field>
        <Form.Field inline>
        <Input label='Mbiemri' name='mbiemri' placeholder='Mbiemri' value={nxenesiUserStore.mbiemri}/>
        </Form.Field>
        <Form.Field inline>
        <Input label='Datelindja' name='datelindja' placeholder='Datelindja' value={datess(nxenesiUserStore.datelindja!)} />
        </Form.Field>

        <Form.Field inline>
        <Input label='Rruga' name='rruga' placeholder='Rruga' value={nxenesiUserStore.rruga} />
        </Form.Field>

        <Form.Field inline>
        <Input label='Qyteti' name='qyteti' placeholder='Qyteti' value={nxenesiUserStore.qyteti}/>
        </Form.Field>

        <Form.Field inline>
        <Input label='Email' name='email' placeholder='Email' value={nxenesiUserStore.email}/>
        </Form.Field>

        <Form.Field inline>
        <Input label='Nr. kontaktues' name='numriKontaktues' placeholder='numri' value={nxenesiUserStore.numri}/>
        </Form.Field>        
      </Form>
      
    </Segment>
  )
})
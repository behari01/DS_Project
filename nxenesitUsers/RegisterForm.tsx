import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { useState } from 'react';
import { ChangeEvent } from 'react';


export default observer(function RegisterForm(){
    const {nxenesiUserStore} = useStore();

    const initialState = {
        
        displayName: 'student',
        username: '',
        email: '',
        password: '',
        emri: '',
        mbiemri: '',
        datelindja: '',
        rruga: '',
        qyteti: '',
        numriKontaktues: '',
        error: null
    }

    const [registerNxenesi] = useState(initialState);

    

    return (

        <Formik    
            initialValues={registerNxenesi}
            onSubmit={( values, {setErrors} )=> nxenesiUserStore.register(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}
        >
            {({handleSubmit, isSubmitting,errors, isValid, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='REGJISTRO NXENESIN' color='red' textAlign='center'/>
                    <MyTextInput name='emri' placeholder='Emri'/>
                    <MyTextInput name='mbiemri' placeholder='Mbiemri'/>
                    <MyTextInput type='date' name='datelindja' placeholder='Datelindja'/>
                    <MyTextInput name='rruga' placeholder='Rruga'/>
                    <MyTextInput name='qyteti' placeholder='Qyteti'/>
                    <MyTextInput name='numriKontaktues' placeholder='numri'/>
                    <MyTextInput name='username' placeholder='Username'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type="password"/>
                    <ErrorMessage 
                        name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='REGISTER' type='submit' fluid/>
                </Form>
            )}
            
        </Formik>
    )
})
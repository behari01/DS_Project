import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm(){
    const {nxenesiUserStore} = useStore();

    return (
        
        <Formik    
            initialValues={{email: '', password: '', error: null}}
            onSubmit={( values, {setErrors} )=> nxenesiUserStore.login(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting,errors}) => (
                <div className="loginNxenesi">
                <img src="/assets/top.png"/>
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <Header as='h2' content='KYÇU SI NXËNËS' color='green' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type="password"/>
                    <ErrorMessage 
                        name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} color='green' content='Login' type='submit' fluid/>
                </Form>
                </div>
            )}
            
        </Formik>
       
    )
})
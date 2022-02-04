import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Container, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginFormMesimdhenesi(){
    const {nxenesiUserStore} = useStore();
    return (
        <Container>
       
        <Formik    
            initialValues={{email: '', password: '', error: null}}
            onSubmit={( values, {setErrors} )=> nxenesiUserStore.login(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting,errors}) => (
                <div className="loginNxenesi">
                <img src="/assets/top2.png"/>
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <Header as='h2' content='KYÇU SI MËSIMDHËNËS' color='blue' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type="password"/>
                    <ErrorMessage 
                        name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} color='blue' content='Login' type='submit' fluid/>
                </Form>
                </div>
            )}
            
        </Formik>
        </Container>
    )
})
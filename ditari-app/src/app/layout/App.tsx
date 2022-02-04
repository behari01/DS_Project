import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import SideBar from './SideBar';
import MesimdhenesiDashboard from '../../features/Mesimdhenesi/dashboard/MesimdhenesiDashboard';
import BookDashboard from '../../features/Books/dashboard/BookDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../../features/home/HomePage';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import { Switch } from 'react-router-dom';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/nxenesitUsers/LoginForm';
import LoginFormMesimdhenesi from '../../features/mesimdhenesiUser/LoginFormMesimdhenesi';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import NxenesiDashboard from '../../features/Nxenesi/dashboard/NxenesiDashboard';
import Dashboard from '../../features/Mesimdhenesi/dashboard/Dashboard';
import RegisterForm from '../../features/nxenesitUsers/RegisterForm';
import SesionDashboard from '../../features/Sesions/dashboard/SesionDashboard';
import AnkesDashboard from '../../features/Ankesat/dashboard/AnkesDashboard';
import NoteDashboard from '../../features/Notes/dashboard/NoteDashboard';
import SesionetPage from '../../features/front/SesionetPage/SesionetPage';
import Librat from '../../features/Books/dashboard/Librat';
import LiteraturaHome from '../../features/home/LiteraturaHome';
import About from '../../features/home/About';
import SesionListR from '../../features/Sesions/dashboard/SesionListR';
import ProfileDetails from '../../features/Profile/ProfileDetails';


function App() {
  
  const myStyle= {
    marginLeft: "7em",
    marginTop:"2em"
  };

  const {commonStore, nxenesiUserStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      nxenesiUserStore.getUser().finally(() => commonStore.setAppLoaded());
    }else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, nxenesiUserStore])

  if(!commonStore.appLoaded) return <LoadingComponent content="Duke i procesuar te dhenat..."/>
  

  return (
   
   <Fragment>
     <ToastContainer position='bottom-right' hideProgressBar/>
     {nxenesiUserStore.isLoggedIn ? (<SideBar/>):(<h1></h1>)}

     <Container style={myStyle}>
  
      
        {nxenesiUserStore.roli==1?(
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/mesimdhenesi/dashboard' component={Dashboard} />
            <Route path='/mesimdhenesi/nxenesit' component={MesimdhenesiDashboard} />
            <Route path='/mesimdhenesi/literatura' component={BookDashboard} />
            <Route path='/mesimdhenesi/sesions' component={SesionDashboard} />
            <Route path='/mesimdhenesi/ankesat' component={AnkesDashboard} />
            <Route path='/mesimdhenesi/notes' component={NoteDashboard} />
            <Route path='/mesimdhenesi/profili' component={ProfileDetails} />
            <Route path='/errors/' component={TestErrors} />
            <Route path='/server-error' component={ServerError} />
            <Route component={NotFound} />
          </Switch>
        ):(<h3></h3>)}

        {nxenesiUserStore.roli==0?(
            <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/nxenesi/dashboard' component={NxenesiDashboard} />
            <Route path='/nxenesi/literatura' component={LiteraturaHome} />
            <Route path='/nxenesi/sesionet' component={SesionDashboard} />
            <Route path='/nxenesi/profili' component={ProfileDetails} />
            <Route path='/errors/' component={TestErrors} />
            <Route path='/server-error' component={ServerError} />
            <Route component={NotFound} />
            </Switch>

        ):(<h3></h3>)}
       
       {nxenesiUserStore.isLoggedIn?(<h3></h3>):(
          <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/nxenesiRegister' component={RegisterForm}/>
          <Route path='/nxenesiLogin' component={LoginForm} />
          <Route path='/mesimdhenesiLogin' component={LoginFormMesimdhenesi} />
          <Route path='/about' component={About} />
          <Route component={NotFound} />
          </Switch>
       )}
       
      </Container>
  </Fragment>
  );
}

export default observer(App);

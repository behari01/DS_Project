import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../API/agent";
import { RegisterValues, User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class NxenesiUserStore{
    user: User | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }

    get roli(){
        return this.user?.roli;
    }

    get id(){
        return this.user?.id;
    }

    get emri(){
        return this.user?.emri;
    }

    get mbiemri(){
        return this.user?.mbiemri;
    }

    get email(){
        return this.user?.email;
    } 

    get datelindja(){
        return this.user?.datelindja;
    }

    get rruga(){
        return this.user?.rruga;
    }

    get qyteti(){
        return this.user?.qyteti;
    }

    get numri(){
        return this.user?.numriKontaktues
    }

    

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.NxenesiAccount.login(creds);
            console.log(user.roli);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user=user);
            if(user.roli == 1){
            history.push('/mesimdhenesi/dashboard');
            }else if(user.roli == 0){
            history.push('/nxenesi/dashboard');
            }
        }catch(error){
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push('/');
    }

    getUser = async () => {
        try{
            const user = await agent.NxenesiAccount.current();
            runInAction(() => this.user = user);
        }catch(error){
            console.log(error);
        }
    }

    register = async (creds: RegisterValues) => {
        try{
            const user = await agent.NxenesiAccount.register(creds);
            // store.commonStore.setToken(user.token);
            // runInAction(() => this.user=user);
            history.push('/mesimdhenesi');
            history.push('/mesimdhenesi/nxenesit');  
        }catch(error){
            throw error;
        }
    }
}
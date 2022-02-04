import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Book } from '../models/book';
import { Nxenesi } from '../models/nxenesi';
import { User, UserFormValues, Profile, RegisterValues } from '../models/user';
import { store } from '../stores/store';
import { Sesion } from '../models/sesion';
import { Ankes } from '../models/ankes';
import { Note } from '../models/note';

const sleep = (delay: number) => {
    return new Promise((resolve) => {setTimeout(resolve, delay)})
}

axios.defaults.baseURL='http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

//DELAY 1000ms i te dhenave
axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch(status){
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }

            if(config.method === 'get' && data.errors.hasOwnProperty('nxenesiID')){
                history.push('/not-found');
            }

            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Nxenesit = {
    list: () => requests.get<Nxenesi[]>('/nxenesi'),
    create: (nxenesi: Nxenesi) => axios.post<void>('/nxenesi',nxenesi),
    update: (nxenesi: Nxenesi) => axios.put<void>(`/nxenesi/${nxenesi.id}`,nxenesi),
    delete: (id: string) => axios.delete<void>(`/nxenesi/${id}`)
}

const Books = {
    list: () => requests.get<Book[]>('/books'),
    details: (id: string) => requests.get<Book>(`/books/${id}`),
    create: (book: Book) => axios.post<void>('/books',book),
    update: (book: Book) => axios.put<void>(`/books/${book.id}`,book),
    delete: (id: string) => axios.delete<void>(`/books/${id}`)
}

const NxenesiAccount = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login',user),
    register: (user: RegisterValues) => requests.post<User>('/account/register',user)
}

const Sesions = {
    list: () => requests.get<Sesion[]>('/Sesions'),
    details: (id: string) => requests.get<Sesion>(`/sesions/${id}`),
    create: (sesion: Sesion) => axios.post<void>(`/sesions`, sesion),
    update: (sesion: Sesion) => axios.put<void>(`/sesions/${sesion.id}` , sesion),
    delete: (id: string) => axios.delete<void>(`/sesions/${id}`)

}

const Ankesat = {
    list: () => requests.get<Ankes[]>('/Ankesat'),
    details: (id: string) => requests.get<Ankes>(`/ankesat/${id}`),
    create: (ankes: Ankes) => axios.post<void>(`/ankesat`, ankes),
    update: (ankes: Ankes) => axios.put<void>(`/ankesat/${ankes.id}` , ankes),
    delete: (id: string) => axios.delete<void>(`/ankesat/${id}`)

}


const Notes = {
    list: () => requests.get<Note[]>('/Notes'),
    details: (id: string) => requests.get<Note>(`/notes/${id}`),
    create: (note: Note) => axios.post<void>(`/notes`, note),
    update: (note: Note) => axios.put<void>(`/notes/${note.id}` , note),
    delete: (id: string) => axios.delete<void>(`/notes/${id}`)

}

const ProfileX = {
    current: (id: string | undefined) => requests.get<Profile>(`/profile/b4a87611-d64b-4937-9e14-3654841303e2`)
}

const agent = {
    Nxenesit,
    Books,
    NxenesiAccount,
    ProfileX,
    Ankesat,
    Notes,
    Sesions
}

export default agent;
import { makeAutoObservable } from "mobx"

export default class ModalStore{
    modal = {
        open: false,
        body: null
    }

    constructor(){
        makeAutoObservable(this);
    }
}
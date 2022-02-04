import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { Book } from "../models/book";
import { Nxenesi } from "../models/nxenesi";
import { Ankes } from '../models/ankes';
import { Note } from '../models/note';
import { Sesion } from '../models/sesion';

export default class MesimdhenesiStore {
     nxenesit: Nxenesi[] = [];
     sesions: Sesion[] = [];
     selectedSesion: Sesion | null = null;
     ankesat: Ankes[] = [];
     selectedAnkes: Ankes | null = null;
     notes: Note[] = [];
     selectedNote: Note | null = null;
     books: Book[] = [];
     selectedBook: Book | null = null;
     selectedNxenesi: Nxenesi | null = null;
     loading = false;
     loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    
    filterNxenesit = async (nxenesiX: Nxenesi) => {
     this.setLoadingInitial(true);
     console.log(nxenesiX);
     try{
          const nxenesit = await agent.Nxenesit.list();
          nxenesit.forEach(nxenesi => {
               if(nxenesiX.emri.toUpperCase() !== '' && nxenesiX.mbiemri.toUpperCase() !== ''){
                    if(nxenesi.emri.toUpperCase().startsWith(nxenesiX.emri.toUpperCase()) && nxenesi.mbiemri.toUpperCase().startsWith(nxenesiX.mbiemri.toUpperCase())){
                         this.nxenesit.push(nxenesi);
                    }
               }else if(nxenesiX.emri.toUpperCase() !== ''){
                    if(nxenesi.emri.toUpperCase().startsWith(nxenesiX.emri.toUpperCase())){
                         this.nxenesit.push(nxenesi);
                    }
               }else{
                    if(nxenesi.mbiemri.toUpperCase().startsWith(nxenesiX.mbiemri.toUpperCase())){
                         this.nxenesit.push(nxenesi);
                    }
               }
          })
          this.setLoadingInitial(false);
     }catch(error){
          console.log(error);
          this.setLoadingInitial(false);
     }
    }

    removeNxenesit = async () => {
     this.setLoadingInitial(true);
     try{
          const nxenesit = await agent.Nxenesit.list();
          nxenesit.forEach(nxenesi => {
               this.nxenesit = [];
          })
          this.setLoadingInitial(false);
     }catch(error){
          console.log(error);
          this.setLoadingInitial(false);
     }
    }

    loadNxenesit = async () => {
     this.setLoadingInitial(true);
     try{
          const nxenesit = await agent.Nxenesit.list();
          nxenesit.forEach(nxenesi => {
               if(nxenesi.roli==0)
               this.nxenesit.push(nxenesi);
          })
          this.setLoadingInitial(false);
     }catch(error){
          console.log(error);
          this.setLoadingInitial(false);
     }
    }
 
 
   loadBooks = async () => {
    this.setLoadingInitial(true);
    try{
         const books = await agent.Books.list();
         books.forEach(book => {
          this.books.push(book);
         })
         this.setLoadingInitial(false);
    }catch(error){
         console.log(error);
         this.setLoadingInitial(false);
    }
   }

   removeBooks = async () => {
     this.setLoadingInitial(true);
     try{
          const books = await agent.Books.list();
          books.forEach(book => {
               this.books = [];
          })
          this.setLoadingInitial(false);
     }catch(error){
          console.log(error);
          this.setLoadingInitial(false);
     }
    }

     filterBooks = async (bookX: Book) => {
          this.setLoadingInitial(true);
          try {
               const books = await agent.Books.list();
               console.log(bookX);
               books.forEach(book => {
                    if (bookX.autori !== '' && bookX.title !== '') {
                         if (book.autori.startsWith(bookX.autori) && book.title.startsWith(bookX.autori)) {
                              this.books.push(book);
                         }

                    } else if (bookX.autori !== '') {
                         if (book.autori.startsWith(bookX.autori)) {
                              this.books.push(book);
                         }
                    } else {
                         if (book.title.startsWith(bookX.title)) {
                              this.books.push(book);
                         }
                    }

               })
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }

   setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
   }

   createNxenesi = async (nxenesi: Nxenesi) =>  {
        this.loading = true;
        try{
          await agent.Nxenesit.create(nxenesi);
          runInAction(() => {
               this.nxenesit.push(nxenesi);
               this.loading = false;
          })
        }catch(error){
             console.log(error);
             runInAction(() => {
                  this.loading = false;
             })
        }
   }

   createBook = async (book: Book) =>  {
     this.loading = true;
     try{
       await agent.Books.create(book);
       runInAction(() => {
            this.books.push(book);
            this.loading = false;
       })
     }catch(error){
          console.log(error);
          runInAction(() => {
               this.loading = false;
          })
     }
     }

   updateNxenesi = async (nxenesi: Nxenesi) => {
          this.loading = true;
          try{
               await agent.Nxenesit.update(nxenesi);
               runInAction(() => {
                   this.nxenesit = [...this.nxenesit.filter(n => n.id !== nxenesi.id), nxenesi];
                   this.loading = false;
               })
          }catch(error){
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }

   }

   updateBook = async (book: Book) => {
          this.loading = true;
          try{
               await agent.Books.update(book);
               runInAction(() => {
                    this.books = [...this.books.filter(b => b.id !== book.id), book];
                    this.loading = false;
                })
          }catch(error){
               console.log(error);
               runInAction(() => {
               this.loading = false;
          })
     }

     }

   deleteNxenesi = async (id: string) => {
        this.loading = true;
        try{
          await agent.Nxenesit.delete(id);
          runInAction(() => {
               this.nxenesit = [...this.nxenesit.filter(n => n.id !== id)];
               this.loading = false;
          })
        }catch(error){
             console.log(error);
             runInAction(() => {
                  this.loading = false;
             })
        }
   }

   deleteBook = async (id: string) => {
     this.loading = true;
     try{
       await agent.Books.delete(id);
       runInAction(() => {
            this.books = [...this.books.filter(b => b.id !== id)];
            this.loading = false;
       })
     }catch(error){
          console.log(error);
          runInAction(() => {
               this.loading = false;
          })
     }
     }

     loadSesions = async () => {
          this.setLoadingInitial(true);
          try {
               const sesions = await agent.Sesions.list();
               sesions.forEach(sesion => {
                    this.sesions.push(sesion);
               })
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }

     removeSesions = async () => {
          this.setLoadingInitial(true);
          try {
               this.sesions = [];
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }



     createSesion = async (sesion: Sesion) => {
          this.loading = true;
          try {
               await agent.Sesions.create(sesion);
               runInAction(() => {
                    this.sesions.push(sesion);
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }
     }

     updateSesion = async (sesion: Sesion) => {
          this.loading = true;
          try {
               await agent.Sesions.update(sesion);
               runInAction(() => {
                    this.sesions = [...this.sesions.filter(b => b.id !== sesion.id), sesion];
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }

     }

     deleteSesion = async (id: string) => {
          this.loading = true;
          try {
               await agent.Sesions.delete(id);
               runInAction(() => {
                    this.sesions = [...this.sesions.filter(b => b.id !== id)];
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }
     }

     //ANKESATTTTTTTTTTTTTTTTTTT

     loadAnkesat = async () => {
          this.setLoadingInitial(true);
          try {
               const ankesat = await agent.Ankesat.list();
               ankesat.forEach(ankes => {
                    this.ankesat.push(ankes);
               })
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }

     filterAnkesat = async (ankesX: Ankes) => {
          this.setLoadingInitial(true);
          try {
               const ankesat = await agent.Ankesat.list();
               console.log(ankesX);
               ankesat.forEach(ankes => {
                    if (ankesX.emri !== '') {
                         if (ankes.emri.startsWith(ankesX.emri)) {
                              this.ankesat.push(ankes);
                         }
                    }
               })
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }
     

     removeAnkesat = async () => {
          this.setLoadingInitial(true);
          try {
               this.ankesat = [];
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }


     createAnkes = async (ankes: Ankes) => {
          this.loading = true;
          try {
               await agent.Ankesat.create(ankes);
               runInAction(() => {
                    this.ankesat.push(ankes);
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }
     }

     updateAnkes = async (ankes: Ankes) => {
          this.loading = true;
          try {
               await agent.Ankesat.update(ankes);
               runInAction(() => {
                    this.ankesat = [...this.ankesat.filter(b => b.id !== ankes.id), ankes];
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }

     }

     deleteAnkes = async (id: string) => {
          this.loading = true;
          try {
               await agent.Ankesat.delete(id);
               runInAction(() => {
                    this.ankesat = [...this.ankesat.filter(b => b.id !== id)];
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }
     }

     //NOTESSSSSSSSSSSS

     loadNotes = async () => {
          this.setLoadingInitial(true);
          try {
               const notes = await agent.Notes.list();
               notes.forEach(note => {
                    this.notes.push(note);
               })
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }

     filterNotes = async (noteX: Note) => {
          this.setLoadingInitial(true);
          try {
               const notes = await agent.Notes.list();
               console.log(noteX);
               notes.forEach(note => {
                  if (noteX.title !== '') {
                         if (note.title.startsWith(noteX.title)) {
                              this.notes.push(note);
                         }
                    } 

               })
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }




     removeNotes = async () => {
          this.setLoadingInitial(true);
          try {
               this.notes = [];
               this.setLoadingInitial(false);
          } catch (error) {
               console.log(error);
               this.setLoadingInitial(false);
          }
     }


     createNote = async (note: Note) => {
          this.loading = true;
          try {
               await agent.Notes.create(note);
               runInAction(() => {
                    this.notes.push(note);
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }
     }

     updateNote = async (note: Note) => {
          this.loading = true;
          try {
               await agent.Notes.update(note);
               runInAction(() => {
                    this.notes = [...this.notes.filter(b => b.id !== note.id), note];
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }

     }

     deleteNote = async (id: string) => {
          this.loading = true;
          try {
               await agent.Notes.delete(id);
               runInAction(() => {
                    this.notes = [...this.notes.filter(b => b.id !== id)];
                    this.loading = false;
               })
          } catch (error) {
               console.log(error);
               runInAction(() => {
                    this.loading = false;
               })
          }
     }

}

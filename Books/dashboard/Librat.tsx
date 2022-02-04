import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function Librat(){
  const[target , setTarget] = useState('');

  const{mesimdhenesiStore} = useStore();
  const{deleteBook, loading} = mesimdhenesiStore;
  
  useEffect(() => {
    mesimdhenesiStore.removeBooks();
    mesimdhenesiStore.loadBooks();
   }, [mesimdhenesiStore]);
   
  function handleDeleteBook(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteBook(id);
  }
  
  return (
        <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Autori</Table.HeaderCell>
            <Table.HeaderCell>Titulli</Table.HeaderCell>
            <Table.HeaderCell>Klasa</Table.HeaderCell>
            <Table.HeaderCell>Pershkrimi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {mesimdhenesiStore.books.map((book) => (
          
          <Table.Row key={book.id}>
            <Table.Cell>{book.id}</Table.Cell>
            <Table.Cell>{book.autori}</Table.Cell>
            <Table.Cell>{book.title}</Table.Cell>
            <Table.Cell>{book.category}</Table.Cell>
            <Table.Cell>{book.descriptionB}</Table.Cell>
          </Table.Row>
          ))}
          
        </Table.Body>
        
      </Table>
    )

})


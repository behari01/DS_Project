import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EditNote from '../EditNote/EditNote';

import '../../front/style/styleFront.css'
import nxenesiUserStore from '../../../app/stores/nxenesiUserStore';

export default observer(function NoteListR() {
  const [target, setTarget] = useState('');

  const { mesimdhenesiStore } = useStore();
  const { deleteNote, loading } = mesimdhenesiStore;
  const {nxenesiUserStore} = useStore();

  function handleDeleteNote(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteNote(id);
  }

  return (

  

      <div className="kartatNotes">
         {nxenesiUserStore.roli==1?(
            <Card.Group itemsPerRow={4} >
            {mesimdhenesiStore.notes.map((note) => (
  
              <Card key={note.id} id='kartaNotes' itemsPerRow={4}  >
                <Card.Content header={note.title} id='header-blue' />
  
                <Card.Content description={note.descriptionN} id='header-green' />
                <Card.Content extra id='header-black'>
                  <Button name={note.id}
                    loading={loading && target === note.id}
                    onClick={(e) => handleDeleteNote(e, note.id!)} color='red'>DELETE</Button>
                  <EditNote note={note} />
                </Card.Content>
              </Card>
            ))}
            </Card.Group>
         ):( <Card.Group itemsPerRow={4} >
          {mesimdhenesiStore.notes.map((note) => (

            <Card key={note.id} id='kartaNotes' itemsPerRow={4}  >
              <Card.Content header={note.title} id='header-blue' />

              <Card.Content description={note.descriptionN} id='header-green' />
              <Card.Content extra id='header-black'>
              
              </Card.Content>
            </Card>
          ))}
          </Card.Group>)}
      </div>

        )


})


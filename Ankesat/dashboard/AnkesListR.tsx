import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EditAnkes from '../EditAnkes/EditAnkes';


export default observer(function AnkesListR() {
  const [target, setTarget] = useState('');

  const { mesimdhenesiStore } = useStore();
  const { deleteAnkes, loading } = mesimdhenesiStore;

  function handleDeleteAnkes(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteAnkes(id);
  }

  return (
    <Table fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Emri</Table.HeaderCell>
          <Table.HeaderCell>Arsyja</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {mesimdhenesiStore.ankesat.map((ankes) => (

          <Table.Row key={ankes.id}>
            <Table.Cell>{ankes.emri}</Table.Cell>
            <Table.Cell>{ankes.arsyja}</Table.Cell>

            <Table.Cell>
              <Button name={ankes.id}
                loading={loading && target === ankes.id}
                onClick={(e) => handleDeleteAnkes(e, ankes.id!)} color='red'>DELETE</Button>
            </Table.Cell>
            <Table.Cell><EditAnkes ankes={ankes} /></Table.Cell>
          </Table.Row>
        ))}

      </Table.Body>

    </Table>
  )

})


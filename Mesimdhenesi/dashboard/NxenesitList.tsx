import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EditNxenesi from '../EditNxenesi/EditNxenesi';

export default observer(function NxenesitList(){
    const [target,setTarget] = useState('');

    const {mesimdhenesiStore} = useStore();
    const {updateNxenesi, loading, deleteNxenesi} = mesimdhenesiStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
      setTarget(e.currentTarget.name);
      deleteNxenesi(id);
      alert('Successfully deleted!');
    }

    function datess(x: string){
      return x.substring(0,10);
    }
  
    return (
        <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Emri</Table.HeaderCell>
            <Table.HeaderCell>Mbiemri</Table.HeaderCell>
            <Table.HeaderCell>Datelindja</Table.HeaderCell>
            <Table.HeaderCell>Rruga</Table.HeaderCell>
            <Table.HeaderCell>Qyteti</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Nr. kontaktues</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          
        <Table.Body>
        
        {mesimdhenesiStore.nxenesit.map(nxenesi => (
          <Table.Row>
            <Table.Cell>{nxenesi.id}</Table.Cell>
            <Table.Cell>{nxenesi.emri}</Table.Cell>
            <Table.Cell>{nxenesi.mbiemri}</Table.Cell>
            <Table.Cell>{datess(nxenesi.datelindja)}</Table.Cell>
            <Table.Cell>{nxenesi.rruga}</Table.Cell>
            <Table.Cell>{nxenesi.qyteti}</Table.Cell>
            <Table.Cell>{nxenesi.email}</Table.Cell>
            <Table.Cell>{nxenesi.numriKontaktues}</Table.Cell>
            <Table.Cell><Button name={nxenesi.id} loading={loading && target === nxenesi.id} color='red' onClick={(e) => handleActivityDelete(e, nxenesi.id!)}>DELETE</Button></Table.Cell>
            <Table.Cell><EditNxenesi nxenesi = {nxenesi}/></Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
        
       
        
        
      </Table>
    )

})
import React, { useState } from 'react';
import { ReactiveVar }  from "meteor/reactive-var";
import { withTracker } from "meteor/react-meteor-data";

import _ from 'lodash';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Fab from "@material-ui/core/Fab";
import Typography from '@material-ui/core/Typography';

import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

import { initSearch } from '../../../../libs/searchUtils';

import { toDoListApi } from '../../api/toDoListApi';

import { CreateTaskContainer } from '../components/CreateTask';
import SimpleTable from "/imports/ui/components/SimpleTable/SimpleTable";

import * as appStyle from "/imports/materialui/styles";



interface IToDoList {
  toDoLists: object[];
  history: object;
  remove: (doc: object) => void;
  showDialog: (dialog:object) => void;
  onSearch: (text?: string) => void;
  total: number;
  loading: boolean;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  searchBy?: any;
  pageProperties: object;
}

const ToDoList = ({ toDoLists, history, remove, showDialog, total, loading, setPage, setPageSize, searchBy, pageProperties }:IToDoList) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  }


  const onClick = (event, id, doc, showDialog) => {
    history.push('/toDoList/view/'+id);
  }

  const callRemove = (doc) => { 
    const dialogOptions = {
      icon:<Delete />,
      title:'Remover exemplo',
      content:()=><p>{`Deseja remover o exemplo "${doc.title}"?`}</p>,
      actions:({ closeDialog })=>[
        <Button
          color={ 'secondary' }
          onClick={ closeDialog }
        >
          { 'Não' }
        </Button>,
        <Button
          onClick={ ()=>{ remove(doc); closeDialog(); }}
          color={ 'primary' }
        >
          { 'Sim' }
        </Button>,
      ]
    };
    showDialog(dialogOptions)
  }



  return (
    <Container>      
      <Typography style={ appStyle.title }> { 'lista de tarefas' } </Typography>

      <SimpleTable
        schema={ _.pick(toDoListApi.schema,['title', 'description', 'date', 'chip', 'type']) }
        data={ toDoLists }
        onClick={ onClick }
        actions={[{ icon:<Delete color={'primary'} />, onClick:callRemove }]}
      />

      <div style={ appStyle.fabContainer }>
        <Fab
          id={ 'add' }          
          color={ 'primary' }
        >
          <Add onClick={ handleModal } />

          { open ? (<CreateTaskContainer open={ open } close={ handleModal } />) : '' }
        </Fab>
      </div>        
    </Container>
  )
}



export const subscribeConfig = new ReactiveVar({
  pageProperties: {
    currentPage: 1,
    pageSize: 25,
  },
  sortProperties: { field: 'createdat', sortAscending: true },
  filter: {},
  searchBy:null,
});

const toDoListSearch = initSearch(
  toDoListApi, // API
  subscribeConfig, // ReactiveVar subscribe configurations
  ['title','description'], // list of fields
);


export const ToDoListContainer = withTracker((props) => {
  //Reactive Search/Filter
  const config = subscribeConfig.get();
  const sort = {
    [ config.sortProperties.field ]:
    config.sortProperties.sortAscending ? 1 : -1,
  };
  toDoListSearch.setActualConfig(config);

  //Subscribe parameters
  const filter = {
    ...config.filter,
  };

  const limit = config.pageProperties.pageSize*config.pageProperties.currentPage;
  const skip = (config.pageProperties.currentPage-1)*config.pageProperties.pageSize;

  //Reactive Counter
  const subHandleCounter = toDoListApi.subscribe('defaultCounter',filter);
  const toDoListsCount = subHandleCounter ? (subHandleCounter.ready() ? toDoListApi.counts.findOne() : null) : 0;

  //Collection Subscribe
  const subHandle = toDoListApi.subscribe('default', filter, { sort, limit, skip });
  const toDoLists = subHandle.ready() ? toDoListApi.find(filter, { sort }).fetch():[]


  return ({
    toDoLists,
    loading: !!subHandle && !subHandle.ready(),
    remove:(doc) => {
      toDoListApi.remove(doc,(e,r) => {
        if(!e) {
          props.showSnackBar({
            type:'success',
            title:'Operação realizada!',
            description: `O exemplo foi removido com sucesso!`,
          })
        } else {
          console.log('Error:',e);
          props.showSnackBar({
            type:'error',
            title:'Operação não realizada!',
            description: `Erro ao realizar a operação: ${ e.message }`,
          })
        }
      })
    },
    searchBy:config.searchBy,
    onSearch: toDoListSearch.onSearch,
    total: toDoListsCount ? toDoListsCount.count : toDoLists.length,
    pageProperties:config.pageProperties,
    setPage: (page=1) => {
      config.pageProperties.currentPage = page;
      subscribeConfig.set(config);
    },
    setPageSize: (size=25) => {
      config.pageProperties.pageSize = size;
      subscribeConfig.set(config);
    },
  })
})(ToDoList)
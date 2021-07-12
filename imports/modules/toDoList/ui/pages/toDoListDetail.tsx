import React from 'react';
import { withTracker } from "meteor/react-meteor-data";

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import DatePickerField from '../../../../ui/components/SimpleFormFields/DatePickerField/DatePickerField';
import SimpleForm from "../../../../ui/components/SimpleForm/SimpleForm";
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import ToggleSwitchField from '../../../../ui/components/SimpleFormFields/ToggleField/ToggleField';

import { toDoListApi } from '../../api/toDoListApi';

import * as appStyle from "/imports/materialui/styles";



interface IToDoListDetail {
  screenState: string;
  loading: boolean;
  toDoListDoc: object;
  save: { 
    (
      doc: object, 
      callback?: {}
    ): void 
  };
  history: { 
    push(url: string): void 
  };
}

const ToDoListDetail = ({ screenState, loading, toDoListDoc, save, history }: IToDoListDetail) => {

  const handleSubmit = (doc: object) => {
    save(doc);
  }

  
  return (
    <Container>
      <Typography style={ appStyle.title }>
        { screenState === 'view' ? (
          'Visualizar tarefa' 
        ) : (
          screenState === 'edit' ? 'Editar tarefa' : ''
        )}
      </Typography>

      <SimpleForm
        mode={ screenState }
        schema={ toDoListApi.schema }
        doc={ toDoListDoc }
        onSubmit={ handleSubmit }
        loading={ loading }
      >
        <TextField
          placeholder='Tarefa'
          name='title'
        />
        <TextField
          placeholder='Descrição'
          name='description'
        />

        <DatePickerField
          placeholder='Data'
          name='date'
        />

        { screenState === 'view' ? (
          toDoListDoc.isParticular && <label style={ appStyle.labelIsParticular}> Tarefa particular </label> 
        ) : (
          <ToggleSwitchField name='isParticular' />
        )}
      

        <div key={ 'Buttons' } style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', paddingTop: 20, paddingBottom: 20 }}>
          <Button
            key={ 'b1' }
            style={{ marginRight: 10 }}
            onClick={ screenState === 'edit' ? () => history.push(`/toDoList/view/${ toDoListDoc._id }`) : () => history.push(`/toDoList/list`) }
            color={ 'secondary' } 
            variant="contained">
            { screenState === 'view' ? 'Voltar' : 'Cancelar' }
          </Button>
          

          { screenState === 'view' ? (
            <Button 
              key={ 'b2' } 
              onClick={ () => history.push(`/toDoList/edit/${ toDoListDoc._id }`) }
              color={ 'primary' } 
              variant="contained"
            >
              { 'Editar' }
            </Button>
          ) : null }

          { screenState !== 'view' ? (
            <Button key={ 'b3' } color={ 'primary' } variant="contained" submit="true" >
              { 'Salvar' }
            </Button>
          ) : null }
        </div>
      </SimpleForm>
    </Container>
  )
}

interface IToDoListDetailContainer {
  screenState: string;
  id: string;
  history: { 
    push(url: string): void 
  };
  showSnackBar: (
    data: { 
      type: string, 
      title: string, 
      description: string 
    }
  ) => void;
}

export const ToDoListDetailContainer = withTracker((props: IToDoListDetailContainer) => {
  const { screenState, id } = props;
  const subHandle = toDoListApi.subscribe('default', { _id: id });
  const toDoListDoc = subHandle.ready() ? toDoListApi.findOne({ _id: id }) : {}

  return ({
    screenState,
    toDoListDoc,
    save: (doc, callback) => toDoListApi.upsert(doc, (e, r) => {
      if (!e) {
        props.history.push(`/toDoList/view/${screenState === 'create' ? r : doc._id }`)
        props.showSnackBar({
          type: 'success',
          title: 'Operação realizada!',
          description: `A tarefa foi ${ doc._id ? 'atualizada' : 'cadastrada' } com sucesso!`,
        })
      } else {
        console.log('Error:', e);
        props.showSnackBar({
          type: 'error',
          title: 'Operação não realizada!',
          description: `Erro ao realizar a operação: ${ e.message }`,
        })
      }
    }),
  })
})(ToDoListDetail)
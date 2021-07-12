import React from 'react';
import { withTracker } from "meteor/react-meteor-data";

import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import { toDoListApi } from '../../api/toDoListApi';

import ChipInput from '../../../../ui/components/SimpleFormFields/ChipInput/ChipInput';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import DatePickerField from '../../../../ui/components/SimpleFormFields/DatePickerField/DatePickerField';
import SelectField from '../../../../ui/components/SimpleFormFields/SelectField/SelectField';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import ToggleSwitchField from '../../../../ui/components/SimpleFormFields/ToggleField/ToggleField';

import * as appStyle from "/imports/materialui/styles";



const CreateTask = ({ open, close, toDoListDoc, save }) => {
  const handleSubmit = (doc) => {
    save(doc);
  }

 
  return (
    <Modal 
      open={ open }
      onClose={ () => close() }
    >
      <div style={ appStyle.modal }>
        <Typography style={ appStyle.titleModal }> Preencha os campos </Typography>

        <SimpleForm
          mode='create'
          schema={ toDoListApi.schema }
          doc={ toDoListDoc }
          onSubmit={ handleSubmit }
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

          <ToggleSwitchField
            name='isParticular'
          />

          <div key={ 'Buttons' } style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', paddingTop: 20, paddingBottom: 20 }}>
            <Button
              key={ 'b1' }
              style={{ marginRight: 10 }}
              color={ 'secondary' } 
              variant="contained"
              onClick={ close }
            >
              { 'Cancelar' }
            </Button>

            <Button key={ 'b3' } color={ 'primary' } variant="contained" submit="true" >
              { 'Salvar' }
            </Button>
          </div>
        </SimpleForm>
			</div>
    </Modal>
  )
}


export const CreateTaskContainer = withTracker((props) => {
  const { open, handleModal, id } = props;
  const subHandle = toDoListApi.subscribe('default', { _id: id });
  const toDoListDoc = subHandle.ready() ? toDoListApi.findOne({ _id: id }) : {}

  return ({
    open,
    handleModal, 
    toDoListDoc,
    save: (doc, callback) => toDoListApi.upsert(doc, (e, r) => {
      if (!e) {
        props.showSnackBar({
          type: 'success',
          title: 'Operação realizada!',
          description: 'A tarefa foi cadastrada com sucesso!',
        })
      } else {
        props.showSnackBar({
          type: 'error',
          title: 'Operação não realizada!',
          description: `Erro ao realizar a operação: ${ e.message }`,
        })
      }
    }),
  })
})(CreateTask)
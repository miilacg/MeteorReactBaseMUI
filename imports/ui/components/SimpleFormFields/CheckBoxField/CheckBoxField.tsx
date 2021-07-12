import React from "react";

import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import _ from "lodash";

import { hasValue } from "/imports/libs/hasValue";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import { checkBoxStyle } from './CheckBoxFieldStyle'



export default ({ name, label, value, onChange, readOnly, schema, error, ...otherProps }:IBaseSimpleFormComponent) => {

  const handleChangeCheck = (event:React.BaseSyntheticEvent, itemCheck:string) => {
    const newValue = typeof(value) === 'object' ? value : {}
    newValue[itemCheck] = event.target.checked
    onChange({ name, target: {name, value: newValue }}, {name, value: newValue })
  }

  const list = otherProps.checksList && hasValue(otherProps.checksList) ? otherProps.checksList : (schema && hasValue(schema.checksList) ? schema.checksList : null);

  return (
    <div style={ error ? checkBoxStyle.fieldError : undefined }>
      <SimpleLabelView label={ label } />

      { !readOnly && list ? (
        <div>
          { list.map((itemCheck) => {
            return (
              <FormControlLabel 
                control={ <Checkbox checked={ !!value[itemCheck] } name={ itemCheck } onChange={ (event) => handleChangeCheck(event, itemCheck) } /> }
                key={ itemCheck }
                value={ value }
                id={ itemCheck }
                label={ itemCheck }
                { ...(_.omit(otherProps,['disabled', 'checked'])) }
              />
            )
          })}
        </div>
      ):(
        list ?
        <div style={{ display:'flex', flexDirection:'row', alignItems:'center', flexWrap:'wrap', width:'100%' }}>
          { list.map((itemCheck) => {
            return (
              <div style={{ marginLeft:20, color:!!value[itemCheck] ? '#999' : undefined }} >
                { !!value[itemCheck] ? <Check style={{ fontSize:15 }} /> : '' }
                { itemCheck }
              </div>
            )
          })}
        </div> : null
      )}
    </div>
  )
}

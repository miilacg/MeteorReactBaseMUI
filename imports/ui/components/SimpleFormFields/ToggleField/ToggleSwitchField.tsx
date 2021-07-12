import React, { useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import _ from "lodash";

import { hasValue } from "/imports/libs/hasValue";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import { toggleSwitchStyle } from "./ToggleFieldStyle";



export default ({ name, label, value, onChange, readOnly, error, ...otherProps }:IBaseSimpleFormComponent) => {
  const [loadRender, setLoadRender] = useState(0);

  const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
    if(!readOnly){
      const newValue = typeof(value) === 'object' ? value : {}
      newValue[itemCheck] = event.target.checked
      onChange({ target:{ value: newValue }}, { name, value: newValue })
      setLoadRender(loadRender+1);
    }
  }

  const handleChangeSwitch = (event: React.BaseSyntheticEvent) => {
    if(!readOnly){
      const value = {};
      value[name] = event.target.checked;
      onChange({ target:{ value: value }}, { name, value: value })
    }
  }


  return (
    <div style={ error ? toggleSwitchStyle.fieldError : undefined }>
      <SimpleLabelView label={ label } />

      { otherProps && hasValue(otherProps.checksList) ?
        <div>
          { otherProps.checksList.map((itemCheck) => {
            return (
              <FormControlLabel 
                style={ toggleSwitchStyle.checksList }  
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
      :
        <FormControlLabel 
          style={ toggleSwitchStyle.checksList }  
          control={ <Switch checked={ !!value[name] } onChange={ handleChangeSwitch } name={ name } /> }
          key={ name }
          value={ value }
          id={ name }
          name={ name }
          label={ !!value ? 'Ativo' : 'Inativo' }
          { ...(_.omit(otherProps,['disabled', 'checked'])) }
        />
      }
    </div>
  )
}

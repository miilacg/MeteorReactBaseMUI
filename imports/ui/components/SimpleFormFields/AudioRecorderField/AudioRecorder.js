import React from "react";

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import Fab from '@material-ui/core/Fab';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';

import {audioRecorderStyle} from "./AudioRecorderStyle";

export default ({name,label,value,onChange,readOnly,error})=>{

  const [values, setValues] = React.useState({ recordButton: true, audioButton: false, deleteButton: false});

  let recorder = null;

  const deleteAudio = () => {
      onChange({},{name,value: '-'})
      setValues({
        ...values,
        ['recordButton']: true, ['audioButton']: false , ['deleteButton']: false
      });
  }

  const onSuccess = (stream) => {
    recorder = new MediaRecorder(stream, {
        type: 'audio/ogg; codecs=opus'
    });

    recorder.start(); // Starting the record

    recorder.ondataavailable = (e) => {
        // Converting audio blob to base64
        let reader = new FileReader()
        reader.onloadend = () => {
            //console.log(reader.result);
            onChange({},{name, value: reader.result}); // You can upload the base64 to server here.
        }

        reader.readAsDataURL(e.data);
    }
  };

  const handleRecordAudio = (event) => {

    setValues({
      ...values,
      ['recordButton']: false, ['audioButton']: false , ['deleteButton']: false
    });

    navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

    navigator.getUserMedia({
        audio: true
    }, onSuccess, (e) => {
        console.log(e);
    });

    const stop = document.querySelector('.stop');
    stop.onclick = function() {
      recorder.stop();
    }
  };

  const handleStopRecordAudio = (event) => {
    setValues({
      ...values,
      ['recordButton']: true, ['audioButton']: true , ['deleteButton']: true });
  };

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>
          <p>
            <audio src={value}  controlsList={"nodownload"} controls="controls" autobuffer="autobuffer" style={audioRecorderStyle.buttonOptions}/>
          </p>
        </div>)
    }

    return (
      <div key={name} style={audioRecorderStyle.containerRecord}>
      {!values.audioButton ?
        <Fab color="secondary" aria-label="record" className="record" disabled={!values.recordButton} style={audioRecorderStyle.buttonOptions}>
            <KeyboardVoiceIcon onClick={handleRecordAudio} value={values.recordButton} />
        </Fab>
      : null}
      {!values.audioButton ?
        <Fab color="secondary" aria-label="play" className="stop" disabled={values.recordButton} style={audioRecorderStyle.buttonOptions}>
            <StopIcon onClick={handleStopRecordAudio} value={values.recordButton} />
        </Fab>
        : null}
        {values.audioButton ?
          <audio src={value} controlsList={"nodownload"} controls="controls" autobuffer="autobuffer" style={audioRecorderStyle.buttonOptions}/>
        : null}
        {values.deleteButton && values.audioButton ?
          <DeleteIcon onClick={deleteAudio} style={{marginTop: 10}} />
        : null}
      </div>
    )
}

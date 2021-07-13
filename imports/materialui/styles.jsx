/*!

 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { max } from 'lodash';
import { isMobile } from '/imports/libs/deviceVerify';

const primaryColor = '#5a9902';
const secondaryColor = '#39a6fc';

//Background Color
const systemBackgroundColor = '#eeeeee';
const pageBackgroundColor = '#eeeeee';

// Pages
const titleTextColor = '#000000';
const titleSecondaryTextColor = '#858585';
const title = {
  margin: '1rem auto 2rem',
  textAlign: 'center',
  fontSize: isMobile ? '1rem' : '2.8rem',
  color: titleTextColor,
  fontWeight: '700',
  textDecoration: 'underline',
  textTransform: 'lowercase',
};

const subtitle = {
  color: titleSecondaryTextColor,
  fontSize: isMobile ? '15px' : '25px',
  paddingTop: isMobile ? '20px' : '20px',
  paddingBottom: isMobile ? '30px' : '30px',
  fontWeight: isMobile ? '100' : '100',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const subtituloInfoComplementar = {
  margin: isMobile ? '30px 0px 16px 20px' : '50.6px 47.2px 16.2px 0.6px',
  fontSize: isMobile ? '14px' : '20px',
  fontWeight: 'normal',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 1.2,
  letterSpacing: '0.7px',
  textAlign: 'left',
  color: '#858585',
};

const avisoFinalPag = {
  width: '100%',
  minHeight: 300,
  display: 'flex',justifyContent: 'center', alignItems: 'center',
  backgroundColor: '#dcd9d5',
};

const fabContainer = {
  position: 'fixed',
  bottom: isMobile ? 80 : 30,
  right: 30,
};

const containerHome = {
  marginTop: '2em',
};

const formGroup = {
  width:'100%',
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  justifyContent: 'space-between',
  padding: isMobile ? '0 20px' : 'none',
};

const formGroup2 = {
  width:'70%',
  maxWidth: '70%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const row = {
  display: 'flex',
  flexDirection:'row',
  flexWrap:'wrap',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 20,//isMobile ? 40 : 40,
  marginBottom: 40,
  paddingBottom: 100,
};

const isParticular = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-end',
  padding: '.25rem .25rem 0'
};

const labelIsParticular = {
  color: 'rgba(0, 0, 0, 0.54)',
  padding: '0px',
  whiteSpace: 'break-spaces',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '1.4rem',
  fontWeight: 'normal',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: '1.68',
  letterSpacing: '0.5px',
  textAlign: 'left',
  textTransform: 'none'
}

const logo = {
  maxWidth: 100,
};

const column = {
  flex: 0.5,
};

const fieldContainer = {
  flex:1,
  padding: 4,
  paddingBottom:0,
}

// Modal
const modal = {
  position: 'absolute',
  width: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: 'none',
  borderRadius: '1rem',
  boxShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.20), 0 5px 8px 0px rgba(0, 0, 0, 0.14), 0 1px 14px 0px rgba(0, 0, 0, 0.12)',
  padding: '1.5rem 1.5rem .5rem',
};

const titleModal = {
  width: 'auto',
  margin: '0 2rem 2.5rem',
  textAlign: 'center',
  fontSize: '2.3rem',
  fontWeight: 500,
  lineHeight: '1.2'
};


// Messages
const warningColor = '#ff9800';
const dangerColor = '#f55a4e';
const successColor = '#4caf50';
const infoColor = '#00acc1';
const textColorMessages = '#002e07';
const textColorGray = '#999999';

// Transition
const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

// Boxes
const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

// Button
const textButtonColor = '#FFF';

export {
  // theme
  primaryColor,
  secondaryColor,

    //Backgorund colors
  systemBackgroundColor,
  pageBackgroundColor,

  // pages
  titleTextColor,
  titleSecondaryTextColor,
  title,
  subtituloInfoComplementar,
  fabContainer,
  containerHome,

  // modal
  modal,
  titleModal,

  // messages
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  textColorMessages,
  textColorGray,

  //two column
  row,
  column,

  //form
  form,
  isParticular,
  labelIsParticular,

  logo,

  //form group
  formGroup,
  formGroup2,

  // transition
  transition,

  // box
  boxShadow,

  // button
  textButtonColor,

  fieldContainer,

  avisoFinalPag,
};

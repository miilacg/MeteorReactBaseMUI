import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import AppBar from "@material-ui/core/AppBar";
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from "@material-ui/core/Toolbar";

import AccountCircle from '@material-ui/icons/AccountCircle';

import Modules from '../../modules';

import { isMobile } from "/imports/libs/deviceVerify";

import { appNavBarStyle } from "./AppNavBarStyle";
import { appLayoutMenuStyle } from "/imports/ui/layouts/AppLayoutFixedMenuStyle";



const HomeIconButton = withRouter((props)=>{
  return (
    <NavLink to={'/'}>
      <div style={ appLayoutMenuStyle.containerHomeIconButton }>
        <img style={ appLayoutMenuStyle.homeIconButton } src='/images/wireframe/logo.png' />
      </div>
    </NavLink>
  )
})


const AppNavBar = ({ user, history, showDrawer, showWindow, theme, location }) => {
  if(location.pathname.indexOf('/full') !== -1 || location.pathname.indexOf('/print') !== -1) {
    return null;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPage = url=> () => {
    handleClose();
    history.push(url);
  }

  const viewProfile = () => {
    handleClose();
    showDrawer({title:'Usuário', url:`/userprofile/view/${ user._id }`})
  }

  const viewProfileMobile = () => {
    handleClose();
    showWindow({title:'Usuário', url:`/userprofile/view/${ user._id }`})
  }

  const pathIndex = (Modules.getAppMenuItemList() || []).findIndex(menuData => menuData.path === '/' && history.location.pathname === '/'
    || menuData.path !== '/' && history.location.pathname.indexOf(menuData.path) === 0);

  if(isMobile) {
    return (
      <div style={{ minHeight:55, width:'100%', backgroundColor:theme.palette.primary.main }}>
        <IconButton
          onClick={ viewProfileMobile }
          style={{ position:'absolute', right:10, bottom:13 }}
        >
          <AccountCircle style={ appNavBarStyle.accountCircle } />
        </IconButton>
      </div>
    )
  }


  return (
    <AppBar position="static">
      <div style={ appLayoutMenuStyle.containerFixedMenu }>
        <HomeIconButton />

        <Toolbar style={ appLayoutMenuStyle.toolbarFixedMenu }>
          <Button
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={ handleMenu }
            color="inherit"
            id="Perfil"
            label="Perfil"
          >
            <AccountCircle id="Perfil" name="Perfil" style={ appNavBarStyle.accountCircle }/>
          </Button>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={ handleClose }
          >
            { !user || !user._id ? (
              [
                <MenuItem key={ 'signin' } as={ NavLink } onClick={ openPage("/signin") }>Entrar</MenuItem>,
                <MenuItem key={ 'signup' } as={ NavLink } onClick={ openPage("/signup") }>Cadastrar-se</MenuItem>
              ]
            ) : (
              [
                <MenuItem key={ 'userprofile' } as={ NavLink } onClick={ viewProfile }>Meus dados</MenuItem>,
                <MenuItem key={ 'signout' } as={ NavLink } onClick={ openPage("/signout") }>Sair</MenuItem>
              ]
            )}
          </Menu>
        </Toolbar>
      </div>
    </AppBar>
  )
}


export default withRouter(AppNavBar);

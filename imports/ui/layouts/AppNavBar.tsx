import React from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modules from '../../modules';
import { isMobile } from "/imports/libs/deviceVerify";
import Tabs from '@material-ui/core/Tabs';
import {appNavBarStyle} from "./AppNavBarStyle";
import AppBar from "@material-ui/core/AppBar";
import {appLayoutMenuStyle} from "/imports/ui/layouts/AppLayoutFixedMenuStyle";
import Toolbar from "@material-ui/core/Toolbar";

const HomeIconButton = withRouter((props)=>{
    return <NavLink to={'/'}><div style={appLayoutMenuStyle.containerHomeIconButton}>
        <img style={appLayoutMenuStyle.homeIconButton} src='/images/wireframe/logo.png' />
    </div></NavLink>
})


const AppNavBar = ({ user,history,showDrawer,showWindow,theme,location }) => {

    if(location.pathname.indexOf('/full')!==-1||location.pathname.indexOf('/print')!==-1) {
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
        showDrawer({title:'Usuário',url:`/userprofile/view/${user._id}`})
    }

    const viewProfileMobile = () => {
        handleClose();
        showWindow({title:'Usuário',url:`/userprofile/view/${user._id}`})
    }

   const pathIndex = (Modules.getAppMenuItemList() || []).findIndex(menuData=>menuData.path==='/'&&history.location.pathname==='/'
    ||menuData.path!=='/'&&history.location.pathname.indexOf(menuData.path)===0);
    if(isMobile) {
        return (
            <div style={{minHeight:55,width:'100%',backgroundColor:theme.palette.primary.main}}>
                <Tabs
                    value={pathIndex}
                    indicatorColor="secondary"
                    aria-label="icon label tabs example"
                    centered={true}
                >
                    {
                        (Modules.getAppMenuItemList() || []).map((menuData,menuIndex)=>{
                            return (<Button key={menuData.path} onClick={()=>history.push(menuData.path)}>
                                    <div style={{display:'flex',flexDirection:isMobile?'column':'row',alignItems:'center',justifyContent:'center', paddingTop: 10}}>
                                        {menuData.icon?menuData.icon:null}
                                    </div>

                                </Button>
                            )

                        })
                    }
                </Tabs>
                <IconButton
                    onClick={viewProfileMobile}
                    style={{position:'absolute',right:10,bottom:13}}
                >
                    <AccountCircle style={appNavBarStyle.accountCircle} />
                </IconButton>
            </div>

        )
    }
    return (
        <AppBar position="static">
            <div style={appLayoutMenuStyle.containerFixedMenu}>
                <HomeIconButton />
                <Toolbar style={appLayoutMenuStyle.toolbarFixedMenu}>
                    <div style={appNavBarStyle.containerNavBar}>
                        <div style={appNavBarStyle.subContainerNavBar}>
                            <Tabs
                                value={pathIndex}
                                indicatorColor="secondary"
                                aria-label="icon label tabs example"
                            >
                                {
                                    (Modules.getAppMenuItemList() || []).map(menuData=>{
                                        return (<Button style={appNavBarStyle.buttonMenuItem} key={menuData.path} onClick={()=>history.push(menuData.path)}>
                                                {menuData.icon?menuData.icon:null}
                                                {menuData.name}
                                            </Button>
                                        )
                                    })
                                }
                            </Tabs>
                        </div>
                        <Button
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            id="Perfil"
                            label="Perfil"
                        >
                            <AccountCircle id="Perfil" name="Perfil" style={appNavBarStyle.accountCircle}/>
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
                            onClose={handleClose}
                        >
                            {!user||!user._id? (
                                [<MenuItem key={'signin'} as={NavLink} onClick={openPage("/signin")}>Entrar</MenuItem>,
                                    <MenuItem key={'signup'} as={NavLink} onClick={openPage("/signup")}>Cadastrar-se</MenuItem>]
                            ) : (
                                [<MenuItem key={'userprofile'} as={NavLink} onClick={viewProfile}>Meus dados</MenuItem>,
                                    <MenuItem key={'signout'} as={NavLink} onClick={openPage("/signout")}>Sair</MenuItem>]
                            )}
                        </Menu>
                    </div>
                </Toolbar>
            </div>
        </AppBar>


    )
}


export default withRouter(AppNavBar);

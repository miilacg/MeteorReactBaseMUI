import React from 'react';
import toDoList from '../ui/pages/toDoList';

export const toDoListRouterList = [
  {
    path: '/toDoList/:screenState/:toDoListId',
    component: toDoList,
    isProtected:true,
  },
  {
    path: '/toDoList/:screenState',
    component: toDoList,
    isProtected:true,
  },
  {
    path: '/toDoList',
    component: toDoList,
    isProtected:true,
  },
];

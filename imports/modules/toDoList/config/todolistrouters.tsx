import React from 'react';
import toDoList from '../ui/pages/toDoList';

export const toDoListRouterList = [
  {
    path: '/toDoList/:screenState/:toDoListId',
    component: toDoList,
    isProtected:true,
  },
  {
    path: '/toDoList/create',
    component: toDoList,
    isProtected:true,
  },
  {
    path: '/toDoList',
    component: toDoList,
    isProtected:true,
  },
];

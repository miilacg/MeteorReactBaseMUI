import React from 'react';
import Meteor from 'meteor/meteor';
import { ToDoListContainer } from './toDoListContainer';
import { ToDoListDetailContainer } from './toDoListDetail';


export default (props:any) => {
	const validState = [ 'view', 'edit', 'create',  'fullView' ];

	const screenState =
		props.match && props.match.params && !!props.match.params.screenState
			? props.match.params.screenState
			: undefined;

	const id =
		props.match && props.match.params && !!props.match.params.toDoListId
			? props.match.params.toDoListId
			: Meteor.toDoListId;
	
	const isPrintView = screenState && screenState.indexOf('print') === 0;
	const isFullView = screenState && screenState.indexOf('full') === 0;

	const newScreenState = screenState ? (
		isPrintView ? screenState.split('print')[1] : (
			isFullView ? screenState.split('full')[1] : screenState
		)
	) : undefined;

	if (!!newScreenState && validState.indexOf(newScreenState) !== -1) {
		if ((newScreenState === 'view') && !!id) {
			return <ToDoListDetailContainer { ...props } screenState={ newScreenState } isFullView={ isFullView } id={ id }/>;
		} else if (newScreenState === 'edit' && !!id) {
			return <ToDoListDetailContainer { ...props } screenState={ newScreenState } isFullView={ isFullView } id={ id } edit/>;
		} else if (newScreenState === 'create') {
			return <ToDoListDetailContainer DetailContainer { ...props } screenState={ newScreenState } isFullView={ isFullView } create/>;
		}
	} else {
		return <ToDoListContainer { ...props } isFullView={ isFullView } />;
	}
};
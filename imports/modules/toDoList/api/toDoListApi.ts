import { ApiBase } from '../../../api/base';
import { toDoListSch } from './toDoListSch';


class ToDoListApi extends ApiBase {
  constructor(props) {
    super('toDoList', toDoListSch);
  }
}

export const toDoListApi = new ToDoListApi();
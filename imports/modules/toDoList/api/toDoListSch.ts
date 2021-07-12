export const toDoListSch = {
  image: {
    type: String,
    label: 'Imagem',
    defaultValue: '',
    optional: true,
    isImage: true,
  },

  title: {
    type: String,
    label: 'Tarefa',
    defaultValue: '',
    optional: false,
  },

  description: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: true,
  },

  date: {
    type: Date,
    label: 'Data',
    defaultValue: '',
    optional: true,
  }, 

  chip: {
    type: [String],
    label: 'Chips',
    defaultValue: '',
    optional: true,
  },

  tasks: {
    type: [Object],
    label: 'Tarefas',
    defaultValue: '',
    optional: true,
    subSchema: {
      name: {
        type: String,
        label: 'Tarefa',
        defaultValue: '',
        optional: false,
      },
      description: {
        type: String,
        label: 'Descrição',
        defaultValue: '',
        optional: true,
      },

      date: {
        type: Date,
        label: 'Data',
        defaultValue: '',
        optional: false,
      },
    }
  },

  isParticular: {
    type: Boolean,
    label: 'Tarefa particular',
    defaultValue: false,
    optional: true,
  },

  statusCheck: {
    type: Object,
    label: 'Status CheckBox',
    defaultValue: '',
    optional: false,
    checksList: ['Todo', 'Doing', 'Done'],
    validate: (value) => {
    const statusTrue = value&&Object.keys(value).filter( status => {
      if(value[status]){
        return status
      }
    })
    return  statusTrue.length <= 1
   }
  },
  
  statusRadio: {
    type: String,
    label: 'Status RadioButton',
    defaultValue: '',
    optional: false,
    radiosList: ['Todo', 'Doing', 'Done'],
  },

  statusToggle: {
    type: Boolean,
    label: 'Status Toogle',
    defaultValue: false,
    optional: false,
  }
};

export interface IToDoList {
  _id?: string;
  image: string;
  title: string;
  description: string;
  createdat: Date;
  updatedat: Date;
  createdby: string;
  statusCheck: object;
  statusToggle: boolean;
}
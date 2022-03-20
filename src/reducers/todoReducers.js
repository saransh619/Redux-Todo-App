const initialData = {
    list: []
}
//const [list,setList] = useState([]);

const todoReducers = (state = initialData, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const { id, data } = action.payload;
            if (!data) {
                alert('please fill up data before adding list :smile:');
            } else {
                return {
                /*initial data*/ ...state, //previous state
                /*current data*/  list: [
                        ...state.list, //previous state ko bhitra initial data xa ki xaina as it is..
                        {
                            id: id,
                            data: data
                        }
                    ]
                }
            }
     
        case 'DELETE_TODO':
            const newList = state.list.filter((elem) => {
                return elem.id !== action.id
            })
            return {
                ...state,
                list: newList
            }

        case 'SAVE_TODO':
            const templist = [...state.list];
            const index = templist.findIndex((elem) => action.payload.id === elem.id );
            templist[index].data = action.payload.data;
            return {
                ...state,
                list: [...templist]
            }
        case 'EDIT_TODO':
            const { id: editId, data: editData } = action.payload;
            let newEditItem = state.list.find((elem) => {
                        return elem.id === editId;
                    })
                    return {
                                ...state,
                                list:[...state.list]
                            }
                           return newEditItem;
                           
            case 'REMOVE_TODO':
            return {
                ...state,
                list: []
            }
        default: return state;
    }
}

export default todoReducers;

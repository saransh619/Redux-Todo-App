export const addTodo = (data) => {
    return{
        type: 'ADD_TODO',
        payload: {
            id: new Date().getTime().toString(),
            data:data
        }
    }
}

export const deleteTodo = (id) => {
    return{
        type: 'DELETE_TODO',
        id
    }
}

export const removeTodo = () => {
    return{
        type: 'REMOVE_TODO',
    }
}

export const editTodo = (data) => {
    console.log(data);
    return{
        type: 'EDIT_TODO',
        payload: {
            id: data.id,
            data: data.data
        }
    }
}

export const saveTodo = (data) => {
    return{
        type: 'SAVE_TODO',
        payload: {
            id: data.id,
            data: data.data
        }
    }
}


import React, { useEffect, useState } from 'react'
import "./Todo.css";
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, removeTodo, editTodo, saveTodo } from '../actions/index';

const TodoList = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toogleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    // for redux 
    const list = useSelector((state) => state.todoReducers.list);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(list)
    },[list]);
    
    const addItem = () => {
        console.log({
            id:isEditItem,data:inputData
        });
        dispatch(saveTodo({id:isEditItem,data:inputData}))
        setToggleSubmit(true);
        setInputData('');
        setIsEditItem(null);
    }

    const editTodoItem=(elem)=>{
        dispatch(editTodo(elem.id));
        setToggleSubmit(false);
        setInputData(elem.data);
        setIsEditItem(elem.id);
    }

    //Firebase
    const postData = async (e) => {
        e.preventDefault();
        const res = await fetch("https://reduxtodolist-default-rtdb.firebaseio.com//reduxTodoList.json",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                myList: list,
            })
        }) 
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <h1>ToDo List</h1>
                    <div className="addItems">
                        <input type="text" className="form-control" placeholder=" Add items....."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {/* toggle the submit btn with the edit btn  */}
                        {toogleSubmit ? <i className="fa fa-plus fa-2x add-btn" title="Add item" onClick={() => dispatch(addTodo(inputData), setInputData(''))}></i> : <i className="far fa-edit add-btn" title="Update item" onClick={addItem}></i>}
                    </div>
                    <div className="showItems">
                        {
                            list.map((elem) => {
                                {/* console.log(elem) */}
                                return (
                                    
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.data} </h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" title="Edit item" onClick={() => editTodoItem(elem)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete item" onClick={() => dispatch(deleteTodo(elem.id))}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="showItems">
                        <button className="btn" target="_blank" onClick={postData}>SEND DATA</button>
                    </div>

                    <div className="showItems">
                        <button className="btn" target="_blank" onClick={() => dispatch(removeTodo())}>REMOVE ALL</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;
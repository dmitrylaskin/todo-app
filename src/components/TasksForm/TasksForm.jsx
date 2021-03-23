import React, {useState} from 'react';
import './TasksForm.scss';
import addSvg from '../../assets/img/add.svg';
import axios from "axios";

const TasksForm = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = () => {
        if(!inputValue) return
        const newTask = {listId: props.listItemId, text: inputValue, completed: false}
        setIsLoading(true)
        axios.post('http://localhost:3004/tasks', newTask)
            .then(response => {
                props.onAddTaskItem(props.listItemId, response.data)
                setEditMode(!editMode)
                setIsLoading(false)
                setInputValue('')
            }).catch((error) => {
                console.log(error);
                alert('Server error')
            })
    }
    const onCancel = () => {
        setEditMode(!editMode)
        setInputValue('')
    }

    return (
        <div className="tasks-form" key={props.key}>
            {editMode ?
                <div className="tasks-form-form">
                    <input className="tasks-form-form__text" type="text" placeholder='task text' value={inputValue}
                           onChange={(event) => setInputValue(event.target.value)}/>
                    <button className="tasks-form-form__submit form-button" disabled={isLoading} onClick={onSubmit}>{isLoading ? 'Loading...' : 'Add new task'}</button>
                    <button className="tasks-form-form__cancel form-button" disabled={isLoading}
                            onClick={onCancel}>Cancel
                    </button>
                </div>
                : <div className="tasks-form-add" onClick={() => setEditMode(!editMode)}>
                    <img className="tasks-form-add__img" src={addSvg} alt=""/>
                    <span className="tasks-form-add__title">Add new task</span>

                </div>}
        </div>
    );
};

export default TasksForm;

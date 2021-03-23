import React from 'react';
import './TaskItem.scss';
import editSvg from "../../assets/img/edit.svg"
import checkSvg from "../../assets/img/check.svg"
import TasksForm from "../TasksForm/TasksForm";
import removeSvg from '../../assets/img/remove.svg';
import {Link} from 'react-router-dom';

const TaskItem = (props) => {
    
    const editHandler = (taskId, listId) => {
        const taskText = window.prompt('Enter your task')
        if (taskText) {
            props.onEditTask(taskId, listId, taskText)
            }
        }

        const removeHandler = (taskId, listId) => {
                props.onRemoveTask(taskId, listId)
        }

        const checkboxHandler = (taskId, listId, isComplited) => {
                
                props.onCompleteTask(taskId, listId, isComplited)
        }
    

    return (
        <div className="content">
            <div className="todo__tasks-title">
                <Link to={`/list/${props.listItem.id}`}><h2 className={`todo__tasks-title-text todo__tasks-title-text--${props.listItem.color}`}>{props.listItem.name}</h2></Link>
                <img className="todo__tasks-title-icon" onClick={() => props.onEditListTitle(props.listItem.id, props.listItem.name)} src={editSvg} alt=""/>
            </div>

            {!props.listItem.tasks?.length
                ? <span className="no-tasks">No tasks</span>
                : <ul className="todo__tasks-list">
                    {props.listItem.tasks.map(task =>

                        <li key={task.id} className="todo__tasks-item">
                            <label className="todo__tasks-elem">
                                
                                <input className={`todo__tasks-check ${task.completed && 'todo__tasks-check'}`}  
                                        type="checkbox" 
                                        onChange={(event) => checkboxHandler(task.id, props.listItem.id, event.target.checked)}
                                        checked={task.completed}/>
                                <div className="todo__tasks-icon">
                                    <img src={checkSvg} alt=""/>
                                </div>
                            </label>
                            <p className={`todo__tasks-text ${task.completed && 'todo__tasks-text--done'}`}>{task.text}</p>

                            <div className="controls">
                                <img className="controls__edit" onClick={() => editHandler(task.id, props.listItem.id)} src={editSvg} alt=""/>
                                <img className="controls__remvoe" onClick={() => removeHandler(task.id, props.listItem.id)} src={removeSvg} alt=""/>
                            </div>
                        </li>)}
                </ul>}

                <TasksForm onAddTaskItem={props.onAddTaskItem} listItemId={props.listItem.id}/>
    </div>
    )
}
export default TaskItem

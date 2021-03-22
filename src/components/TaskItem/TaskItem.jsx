import React from 'react';
import './TaskItem.scss';
import editSvg from "../../assets/img/edit.svg"
import checkSvg from "../../assets/img/check.svg"
import TasksForm from "../TasksForm/TasksForm";

const TaskItem = (props) => {

    return (
        <div className="content">
            <div className="todo__tasks-title">
                <h2 className="todo__tasks-title-text">{props.listItem.name}</h2>
                <img className="todo__tasks-title-icon" onClick={() => props.onEditListTitle(props.listItem.id, props.listItem.name)} src={editSvg} alt=""/>
            </div>

            {!props.listItem.tasks?.length
                ? <span className="no-tasks">No tasks</span>
                : <ul className="todo__tasks-list">
                    {props.listItem.tasks.map(task =>
                        <li key={task.id} className="todo__tasks-item">
                            <label className="todo__tasks-elem">
                                <input className="todo__tasks-check" type="checkbox"/>
                                <div className="todo__tasks-icon">
                                    <img src={checkSvg} alt=""/>
                                </div>
                            </label>
                            <p className="todo__tasks-text">{task.text}</p>
                        </li>)}
                </ul>}

                <TasksForm onAddTaskItem={props.onAddTaskItem} listItemId={props.listItem.id}/>
    </div>
    )
}
export default TaskItem

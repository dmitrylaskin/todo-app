import React from 'react';
import './TaskItem.scss';
import editSvg from "../../assets/img/edit.svg"
import checkSvg from "../../assets/img/check.svg"

const TaskItem = (props) => {
    if (!props.listItem.tasks.length) {
        return <span className="no-tasks">No tasks</span>
    }

    return (
        <div className="content">
            <div className="todo__tasks-title">
                <h2 className="todo__tasks-title-text">{props.listItem.name}</h2>
                <img className="todo__tasks-title-icon" src={editSvg} alt=""/>
            </div>

            <ul className="todo__tasks-list">

                {props.listItem.tasks.map(task => <li key={task.id} className="todo__tasks-item">
                                            <label className="todo__tasks-elem">
                                                <input className="todo__tasks-check" type="checkbox"/>
                                                <div className="todo__tasks-icon">
                                                    <img src={checkSvg} alt=""/>
                                                </div>
                                            </label>
                                            <p className="todo__tasks-text">{task.text}</p>
                                        </li>)}
            </ul>

    </div>
    )
}
export default TaskItem

import React from 'react';
import './TaskItem.scss';
import editSvg from "../../assets/img/edit.svg"
import checkSvg from "../../assets/img/check.svg"

const TaskItem = (props) => {
    return (
        <div className="content">
            <div className="todo__tasks-title">
                <h2 className="todo__tasks-title-text">Front-end</h2>
                <img className="todo__tasks-title-icon" src={editSvg} alt=""/>
            </div>


            <ul className="todo__tasks-list">
                <li className="todo__tasks-item">
                    <label className="todo__tasks-elem">
                        <input className="todo__tasks-check" type="checkbox"/>
                        <div className="todo__tasks-icon">
                            <img src={checkSvg} alt=""/>
                        </div>
                    </label>
                    <p className="todo__tasks-text">Redux</p>
                </li>
                <li className="todo__tasks-item">
                    <label className="todo__tasks-elem">
                        <input className="todo__tasks-check" type="checkbox"/>
                        <div className="todo__tasks-icon">
                            <img src={checkSvg} alt=""/>
                        </div>
                    </label>
                    <p className="todo__tasks-text">Saga</p>
                </li>
                <li className="todo__tasks-item">
                    <label className="todo__tasks-elem">
                        <input className="todo__tasks-check" type="checkbox"/>
                        <div className="todo__tasks-icon">
                            <img src={checkSvg} alt=""/>
                        </div>
                    </label>
                    <p className="todo__tasks-text">ReactJS Hooks (useState, useReducer, useEffect и
                        т.д.)</p>
                </li>
            </ul>

    </div>
    )
}
export default TaskItem

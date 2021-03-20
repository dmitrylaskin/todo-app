import React, {useEffect, useState} from 'react';
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList/AddList";
import axios from 'axios'
import './components/TaskItem/TaskItem.scss'
import './index.scss'
import editSvg from './assets/img/edit.svg'

function App() {
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3004/lists')
            .then(response => setLists(response.data))

        axios.get('http://localhost:3004/colors')
            .then(response => setColors(response.data))
    }, [])


    const onAddList = (obj) => {
        const newLists = [...lists, obj]
        setLists(newLists)

    }
    const removeListItem = (listId) => {
        const newLists = lists.filter(listItem => listItem.id !== listId)
        setLists(newLists)
    }

    return (
        <div className="container">
            <div className="todo">
                <div className="todo__sidebar">

                    <List lists={[{id: 6, name: 'All tasks'}]} icon={listSvg} isRemoveable={false}/>
                    {lists && colors && <List lists={lists.map(item => {
                        item.color = colors.filter(colorItem => colorItem.id === item.colorId)[0].name
                        return item
                    })} removeListItem={removeListItem} icon={null} isRemoveable={true}/>}

                    <AddList onAddList={onAddList} colors={colors} itemStyle={true}/>


                </div>
                <div className="todo__tasks">
                    <div className="content">
                        <div className="todo__tasks-title">
                            <h2 className="todo__tasks-title-text">Front-end</h2>
                            <img className="todo__tasks-title-icon" src={editSvg} alt=""/>
                        </div>


                        <ul className="todo__tasks-list">
                            <li className="todo__tasks-item">
                                <label htmlFor="" className="todo__tasks-elem">
                                    <input className="todo__tasks-check" type="checkbox"/>
                                    <div className="todo__tasks-icon"></div>
                                </label>
                                <label htmlFor="">
                                    <input type="checkbox"/>
                                    <div className="todo__tasks-icon"></div>
                                </label>
                                <p className="todo__tasks-text">ReactJS Hooks (useState, useReducer, useEffect и
                                    т.д.)</p>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

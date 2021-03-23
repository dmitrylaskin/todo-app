import React, {useEffect, useState} from 'react';
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList/AddList";
import axios from 'axios'
import './index.scss'
import TaskItem from './components/TaskItem/TaskItem';
import {Route, useHistory} from "react-router-dom";

function App() {
    
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setActiveItem] = useState(null)
    let history = useHistory();


    useEffect(() => {
            axios.get('http://localhost:3004/lists?_expand=color&_embed=tasks')
            .then(response => {
                setLists(response.data)
                setActiveItem(response.data[0])
            })
            
        axios.get('http://localhost:3004/colors')
            .then(response => {
                setColors(response.data)
            })

    }, [])

    // useEffect(() => {
    //     console.log(history.location.pathname)
    // }, [history.location.pathname])

    const onClickItem = (item) => {
        setActiveItem(item)
        history.push(`/lists/${item.id}`)
    }

    const onAddList = (obj) => {
        const newLists = [...lists, obj]
        setLists(newLists)

    }

    const onAddTaskItem = (id, newTask) => {
        const newLists = lists.map(item => {
            if (item.id === id) {
                item.tasks = [...item.tasks, newTask]
            }
            return item
        })
        setLists(newLists)
    }

    const removeListItem = (listId) => {
        const newLists = lists.filter(listItem => listItem.id !== listId)
        setLists(newLists)
        setActiveItem(lists[0])
    }

    const onEditListTitle = (id, title) => {
        const newTitle = window.prompt('Enter task title', title)
        if (!newTitle) return

        const newLists = lists.map(list => {
            if (list.id === id) {
                list.name = newTitle
            }
            return list
        })
        setLists(newLists)
        axios.patch(`http://localhost:3004/lists/${id}`, {name:newTitle})
            .catch(() => alert('Server error'))
    }

    return (
        
        <div className="container">
            <div className="todo">
                <div className="todo__sidebar">

{/* // All tasks */}
                    <List lists={[{id: 21, name: 'All tasks'}]} icon={listSvg} isRemoveable={false} onClick={() => history.push('/')}/>

{/* // Added lists */}

                    {lists && colors &&
                    <List
                        onClickItem={onClickItem}
                        activeItem={activeItem}
                        lists={lists.map(item => {
                            item.color = colors.filter(colorItem => colorItem.id === item.colorId)[0].name
                            return item
                        })} 
                        removeListItem={removeListItem} icon={null} isRemoveable={true}
                    />}
                   
{/* // Add list button */}
                    {lists && <AddList onAddList={onAddList} colors={colors} itemStyle={true}/>}

{/* // Tasks */}
                </div>
                <div className="todo__tasks">
                    <Route exact path="/">
                        {lists && activeItem && lists.map(list =><TaskItem key={list.id} listItem={list} onEditListTitle={onEditListTitle} onAddTaskItem={onAddTaskItem}/>)}
                    </Route>
                    {lists && activeItem && <TaskItem listItem={activeItem} onEditListTitle={onEditListTitle} onAddTaskItem={onAddTaskItem}/>}

                </div>
            </div>
        </div>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList/AddList";
import axios from 'axios'
import './index.scss'
import TaskItem from './components/TaskItem/TaskItem';
import {Route, useHistory, useLocation} from "react-router-dom";

function App() {
    
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setActiveItem] = useState(null)
    // Bag! Dnt work without useLocation
    let history = useHistory()
    let location = useLocation()

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

    useEffect(() => {
        const listId = history.location.pathname.split('list/')[1]
      
        if (lists) {
            const list = lists.find(list => list.id === +listId)
            setActiveItem(list)

        }
    },[lists, history.location.pathname])


    const onClickItem = (item) => {
        //setActiveItem(item)
        history.push(`/list/${item.id}`)
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
        //history.push('/')

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

    const onEditTask = (taskId, listId, taskText) => {
        axios.patch(`http://localhost:3004/tasks/${taskId}`, {text:taskText})
             .then(() => {
                const newLists = lists.map(list => {
                    if (list.id === listId) {
                        list.tasks = list.tasks.map(task => {
                            if (task.id === taskId) {
                                task.text = taskText
                        }
                        return task
                    })
                    }
                    return list
                })
                setLists(newLists)
             })

    }
    const onRemoveTask = (taskId, listId) => {
        axios.delete(`http://localhost:3004/tasks/${taskId}`)
            .then(() => {
                const newLists = lists.map(list => {
                    if (list.id === listId) {
                        list.tasks = list.tasks.filter(task => task.id !== taskId)
                    }
                    return list
                })
                setLists(newLists)
            })
            .catch(() => alert('Server error'))
    }

    const onCompleteTask = (taskId, listId, isCompleted) => {
        console.log('3 status: ', taskId, listId, isCompleted);
        axios.patch(`http://localhost:3004/tasks/${taskId}`, {completed:isCompleted})
             .then(() => {
                const newLists = lists.map(list => {
                    if (list.id === listId) {
                        list.completed = list.tasks.map(task => {
                            if (task.id === taskId) {
                                task.completed = isCompleted
                        }
                        return task
                    })
                    }
                    return list
                })
                setLists(newLists)
             })
             .catch(() => alert('Server error'))

    }

    return (
        
        <div className="container">
            <div className="todo">
                <div className="todo__sidebar">

{/* // All tasks */}
                    <List lists={[{id: 21, name: 'All tasks'}]} icon={listSvg} isRemoveable={false} allTasksActive={!activeItem} onClick={() => history.push('/')}/>

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
                    {/* // All tasks render*/}
                    <Route exact path="/">
                        {lists && lists.map(list =><TaskItem 
                                                        key={list.id} 
                                                        listItem={list} 
                                                        onEditListTitle={onEditListTitle} 
                                                        onAddTaskItem={onAddTaskItem}
                                                        />)}
                    </Route>

                    {/* // Exact task*/}
                    {lists && activeItem && <TaskItem
                                                key={activeItem.id}
                                                listId={lists}
                                                listItem={activeItem} 
                                                onEditListTitle={onEditListTitle} 
                                                onAddTaskItem={onAddTaskItem}
                                                onEditTask={onEditTask}
                                                onRemoveTask={onRemoveTask}
                                                onCompleteTask={onCompleteTask}/>}


                </div>
            </div>
        </div>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList/AddList";
import axios from 'axios'
import './index.scss'
import TaskItem from './components/TaskItem/TaskItem';

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

{/* // All tasks */}
                    <List lists={[{id: 21, name: 'All tasks'}]} icon={listSvg} isRemoveable={false}/>

{/* // Added lists */}
                    {lists && colors && 
                    <List 
                        lists={lists.map(item => {
                            item.color = colors.filter(colorItem => colorItem.id === item.colorId)[0].name
                            return item
                        })} 
                        removeListItem={removeListItem} icon={null} isRemoveable={true}
                    />}
{/* // Add list button */}
                    <AddList onAddList={onAddList} colors={colors} itemStyle={true}/>

{/* // Tasks */}
                </div>
                <div className="todo__tasks">

                    <TaskItem/>

                </div>
            </div>
        </div>
    );
}

export default App;

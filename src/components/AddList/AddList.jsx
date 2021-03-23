import React, {useEffect, useState} from 'react';
import closeSvg from "../../assets/img/close.svg";
import List from "../List/List";
import './AddList.scss'
import '../Btn/Btn.scss'
import Badge from "../Badge/Badge";
import addSvg from "../../assets/img/add.svg";
import axios from 'axios'


const AddList = (props) => {

    const [visibleAddForm, setVisibleAddForm] = useState(false)
    const [activeColor, setActiveColor] = useState(1)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (props.colors) {
            setActiveColor(props.colors[0].id)
        }
    }, [props.colors])

   const btnListener = (event) => {

       if (!inputValue) {
           alert('Field shouldn\'t be empty')
           return
       }

       setIsLoading(true)
       setInputValue('')
       setActiveColor(1)
       

       axios.post('http://localhost:3004/lists', {
           name: inputValue,
           colorId: activeColor,
        //    color: props.colors.filter(color => color.id === activeColor)[0].name
       }).then(response => {

            
            const color = props.colors.filter(color => color.id === activeColor)[0].name
            const listItem = {...response.data, tasks:[], color: {name:color}}
            
            props.onAddList(listItem)

            setIsLoading(false)
            
       }).finally(() => setVisibleAddForm(false))
   }

   const inputListener = (event) => setInputValue(event.target.value)

    return (
        <>
            
                <List onClick={() => setVisibleAddForm(true)} lists={[{id: 22, name: 'Add list'}]} icon={addSvg} isRemoveable={false} itemStyle={props.itemStyle}/>
          

            {visibleAddForm && <div className="addListForm">
                                    <img onClick={() => setVisibleAddForm(false)} className="addListForm__img" src={closeSvg} alt=""/>
                                    <input className="addListForm__input" type="text" placeholder="enter the list name" onChange={(event) =>inputListener(event)} value={inputValue}/>
                                    <ul className="addListForm__list">

                                        {props.colors.map(el => {
                                                return <li key={el.id} className="addListForm__item">
                                                    <Badge color={el.name} id={el.id} setActiveColor={setActiveColor} activeColor={activeColor} />
                                                </li>
                                            }
                                        )}
                                    </ul>

                                    <button className="addListForm__btn btn" onClick={(event) => {btnListener(event)}} href="/">{isLoading ? 'Loading...' : 'Add list'}</button>
            </div>}
        </>

    );
};

export default AddList;
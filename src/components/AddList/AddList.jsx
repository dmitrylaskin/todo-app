import React, {useEffect, useState} from 'react';
import closeSvg from "../../assets/img/close.svg";
import List from "../List/List";
import './AddList.scss'
import '../Btn/Btn.scss'
import Badge from "../Badge/Badge";
import addSvg from "../../assets/img/add.svg";
import axios from 'axios'


const AddList = (props) => {
    const [visibleAddBtn, setVisibleAddBtn] = useState(false)
    const [activeColor, setActiveColor] = useState(1)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (props.colors) {
            setActiveColor(props.colors[2].id)
        }
    }, [props.colors])

   const btnListener = (event) => {


    //    props.onAddList({
    //        id: Date.now(),
    //        name: inputValue,
    //        colorId: activeColor,
    //        color: props.colors.filter(color => color.id === activeColor)[0].name
    //    })

       setInputValue('')
       setActiveColor(1)
       setVisibleAddBtn(false)

       axios.post('http://localhost:3004/lists', {
           name: inputValue,
           colorId: activeColor,
           color: props.colors.filter(color => color.id === activeColor)[0].name
       }).then(response => {
           console.log(response.data);
           props.onAddList(response.data)

       })

   }
   const inputListener = (event) => {
        setInputValue(event.target.value)
    }


    return (
        <>
            <div onClick={() => setVisibleAddBtn(true)}>
                <List lists={[{id: 6, name: 'Add list'}]} icon={addSvg} isRemoveable={false}/>
            </div>

            {visibleAddBtn && <div className="addListForm">
                <img onClick={() => setVisibleAddBtn(false)} className="addListForm__img" src={closeSvg} alt=""/>
                <input className="addListForm__input" type="text" placeholder="enter the list name" onChange={(event) =>inputListener(event)} value={inputValue}/>
                <ul className="addListForm__list">

                    {props.colors.map(el => {
                            return <li key={el.id} className="addListForm__item">
                                <Badge color={el.name} id={el.id} setActiveColor={setActiveColor} activeColor={activeColor} />
                            </li>
                        }
                    )}
                </ul>

                <button className="addListForm__btn btn" onClick={(event) => {btnListener(event)}} href="/">add list</button>
            </div>}
        </>

    );
};

export default AddList;
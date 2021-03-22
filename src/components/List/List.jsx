import React from 'react';
import ListItem from "./ListItem/ListItem";
import './List.scss'

const List = (props) => {



    return (
        <div onClick={props.onClick}>
            <ul className="sidebar__list" >
         
                    {props.lists.map(el => <ListItem key={el.id}
                                                     item={el}
                                                     activeItem={props.activeItem}
                                                     onClickItem={props.onClickItem}
                                                     id={el.id}
                                                     icon={props.icon}
                                                     name={el.name}
                                                     color={el.color}
                                                     active={el.active}
                                                     itemStyle={props.itemStyle}
                                                     list={props.lists}
                                                     removeListItem={props.removeListItem}
                                                     isRemoveable={props.isRemoveable}/>)}

            </ul>


        </div>
    );
};

export default List;

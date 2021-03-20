import React from 'react';
import '../List.scss'
import removeSvg from "../../../assets/img/remove.svg";
import cn from 'classnames'
import Badge from "../../Badge/Badge";
import axios from 'axios'

const ListItem = (props) => {

    const onRemove = (event) => {
        event.preventDefault()
        axios.delete(`http://localhost:3004/lists/${props.id}`)
            .then((resposne) => {
                props.removeListItem(props.id)
            })

    }

    return (
        <li className={`sidebar__item ${props.active ? 'sidebar__item--active' : ''}`}>
            {props.icon
            ? <img className="sidebar__item-img" src={props.icon} alt=""/>
            : <Badge color={props.color}/>}
            <span className={cn('sidebar__item-text', {'sidebar__item-text--add' : props.itemStyle})}>{props.name}</span>
            {props.isRemoveable && <img className="sidebar__item-close-icon" onClick={event => onRemove(event)} src={removeSvg} alt=""/>}
        </li>
    );
};

export default ListItem;


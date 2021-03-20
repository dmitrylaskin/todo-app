import React from 'react';
import './Badge.scss';
import cn from 'classnames';

const Badge = (props) => {

    return (
            <div onClick={() => props.setActiveColor(props.id)}
                 className={`colorIcon colorIcon--color--${props.color} colorIcon--${cn({'active': props.id === props.activeColor}) }`}>

            </div>

    );
};

export default Badge;
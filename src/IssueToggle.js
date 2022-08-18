//import './IssueFilters.css'
//import { useEffect, useState } from 'react'


function IssueToggle(props) {
    const handleClick = () => {
        const state = props.state ? false : true
        props.onToggle({ issue: props.name, state })
    }

    return (
        <span
            onClick={handleClick}
            tooltip={props.name}
            style={{ opacity: props.state ? 1 : 0.2 }}>

            <img src={`icons/${props.name.replace(' ', '_')}.png`}/>
        </span>
    )
}

export default IssueToggle

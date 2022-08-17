//import './IssueFilters.css'
//import { useEffect, useState } from 'react'


function IssueToggle(props) {
    const handleClick = () => {
        const state = props.state ? false : true
        props.onToggle({ issue: props.name, state })
    }

    return (
        <span onClick={handleClick}>
            <span>{props.name[0]}</span>
            <span>{props.state ? '[x]' : '[ ]'}</span>
        </span>
    )
}

export default IssueToggle

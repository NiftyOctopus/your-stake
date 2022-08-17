//import './Company.css'
//import { useEffect, useState } from 'react'

import IssueToggle from './IssueToggle'

function Company(props) {
    const issues = [
        'Animal Testing',
        'Nuclear Weapons',
        'Coal Power',
        'Rainforest Destruction'
    ]

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.ticker}</td>
            <td>
                { issues.map((issue) => {
                    return (
                        <IssueToggle
                            key={issue}
                            name={issue}
                            state={props.issues[issue]}
                        />
                    )
                })}
            </td>
        </tr>
    )
}

export default Company
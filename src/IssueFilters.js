//import './IssueFilters.css'
//import { useEffect, useState } from 'react'

import IssueToggle from './IssueToggle'


function IssueFilters(props) {
    const issues = [
        'Animal Testing',
        'Nuclear Weapons',
        'Coal Power',
        'Rainforest Destruction'
    ]

    const handleToggle = (filter) => {
        const filters = {...props.filters}
        const issue   = filter.issue
        
        if(filter.state) filters[issue] = true
        else { delete filters[issue] }

        props.onFilterChange(filters)
    }

    return (
        <th>
            <div>
                { issues.map((issue) => {
                    return (
                        <IssueToggle
                            key={issue}
                            name={issue}
                            state={props.filters[issue]}
                            onToggle={handleToggle}
                        />
                    )
                })}
            </div>
        </th>
    )
}

export default IssueFilters

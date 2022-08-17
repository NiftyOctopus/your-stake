//import './TextInput.css'
//import { useEffect, useState } from 'react'


function TextFilter(props) {
    const handleChange = ({ target }) => {
        props.onQueryChange(target.value)
    }

    return (
        <th>
            <div>
                <input
                    type='text'
                    value={props.value}
                    onChange={handleChange}
                />
            </div>
        </th>
    )
}

export default TextFilter
import './App.css'
//import { useEffect, useState } from 'react'

import Company from './Company'
// import Vehicle     from './Vehicle'
// import Stop        from './Stop'

import companies from './company_exclusions.json'


function App() {
    // const [routeList, setRouteList] = useState([])

    // useEffect(() => {
    //     const getRoutes = async () => {
    //         const res  = await fetch(API + 'routes?filter[type]=0,1,2')
    //         const data = await res.json()
    //         setRouteList(data.data)
    //     }
    //     getRoutes()
    // }, [])


    // const [route, setRoute] = useState('CR-Providence')

    // const handleRouteChange = (selected) => {
    //     setRoute(selected)
    // }

    const results = companies

    return (
        <div className='App'>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Ticker</th>
                            <th>Issues</th>
                        </tr>

                        <tr>
                            <th>Search Input</th>
                            <th>Search Input</th>
                            <th>Issue Filters</th>
                        </tr>
                    </thead>

                    <tbody>
                        { results.map((company) => {
                            return (
                                <Company
                                    {...company}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default App

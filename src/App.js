import './App.css'
import { useEffect, useState } from 'react'

import Company      from './Company'
import TextFilter   from './TextFilter'
import IssueFilters from './IssueFilters'

import companies from './company_exclusions.json'


function App() {
    const [results, setResults] = useState(companies)

    const [nameFilter, setNameFilter]     = useState('')
    const [tickerFilter, setTickerFilter] = useState('')
    const [issueFilters, setIssueFilters] = useState({})


    useEffect(() => {
        const issueFilterList = Object.keys(issueFilters)
        
        const filtered = companies.filter((company) => {
            const name   = matchesName(company, nameFilter)
            const ticker = matchesTicker(company, tickerFilter)
            const issues = matchesIssues(company, issueFilterList)

            return name && ticker && issues
        })
        setResults(filtered)

    }, [nameFilter, tickerFilter, issueFilters])


    return (
        <div className='App'>
            <div>
                <table>
                    <thead>
                        <tr className='headers'>
                            <th>Company Name</th>
                            <th>Ticker</th>
                            <th>Issues</th>
                        </tr>

                        <tr className='filters'>
                            <TextFilter
                                value={nameFilter}
                                onQueryChange={setNameFilter}
                            />
                            
                            <TextFilter
                                value={tickerFilter}
                                onQueryChange={setTickerFilter}
                            />

                            <IssueFilters
                                filters={issueFilters}
                                onFilterChange={setIssueFilters}
                            />
                        </tr>
                    </thead>

                    <tbody>
                        { results.map((company) => {
                            return (
                                <Company
                                    key={company.name}
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


function matchesName(company, filter) {
    if(!filter) return true
    const name  = company.name.toLowerCase()
    const query = filter.toLowerCase()

    return name.includes(query)
}

function matchesTicker(company, filter) {
    if(!filter) return true
    const ticker = company.ticker.toLowerCase()
    const query  = filter.toLowerCase()

    return ticker.includes(query)
}

function matchesIssues(company, filters) {
    for(let issue of filters) {
        if(!company.issues[issue]) return false
    }
    
    return true
}
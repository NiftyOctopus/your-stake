import './App.css'
import { useEffect, useState } from 'react'

import Company      from './Company'
import TextFilter   from './TextFilter'
import IssueFilters from './IssueFilters'

import companies from './company_exclusions.json'
const initResults = companies.slice(0, 100)


function App() {
    const [prefiltered, setPrefiltered] = useState({ filters: {}, results: initResults })
    
    const [cache,   setCache]   = useState({})
    const [results, setResults] = useState(initResults)

    const [nameFilter,   setNameFilter]   = useState('')
    const [tickerFilter, setTickerFilter] = useState('')
    const [issueFilters, setIssueFilters] = useState({})


    // Prefilter results by selected issues
    useEffect(() => {
        const issueFilterList = Object.keys(issueFilters)
        
        if(issueFilterList.length === 0) {
            // No issue filters selected
            setPrefiltered({ filters: issueFilters, results: companies })
            return
        }

        const key = getCacheKey(issueFilters)
        if(cache[key]) {
            // Use cached results instead
            console.log('Using cache ' + cache[key].length)
            setPrefiltered({ filters: issueFilters, results: cache[key] })
            return
        }

        const filtered = companies.filter((company) => {
            return matchesIssues(company, issueFilterList)
        })
        setPrefiltered({ filters: issueFilters, results: filtered })

    }, [issueFilters])


    // Cache prefilter results
    useEffect(() => {
        const key = getCacheKey(prefiltered.filters)
        if(!key || cache[key]) return
        
        setCache({ ...cache, [key]: prefiltered.results })

    }, [prefiltered])


    // Apply filters for name and ticker
    useEffect(() => {
        if(!nameFilter && !tickerFilter) {
            // No name or ticker filter
            setResults(prefiltered.results.slice(0, 100))
            return
        }

        const filtered = prefiltered.results.filter((company) => {
            const name   = matchesName(  company, nameFilter)
            const ticker = matchesTicker(company, tickerFilter)

            return name && ticker
        })
        setResults(filtered.slice(0, 100))

    }, [nameFilter, tickerFilter, prefiltered])


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


function getCacheKey(issueFilters) {
    const issues = Object.keys(issueFilters).sort()
    if(issues.length === 0) return

    return issues.join('&').replace(' ', '_')
}

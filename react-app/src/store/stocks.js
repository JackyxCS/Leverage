// Define Action Types as Constants
const SET_SEARCH = 'search/setSearch'

// Define Action Creators
const setSearch = (results) => ({
    type: SET_SEARCH,
    results
})

// Define Thunks

// fetches all stock tickers and company names that match search input
// storing in redux store
export const fetchStockData = (key, searchInput) => async (dispatch) => {
    console.log('here')
    const res = await fetch(`https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=${key}`)
    const json = await res.json()
    let filtered = json.filter(value => value["symbol"].includes(searchInput.toUpperCase()) ||
        value["name"].includes(searchInput.toUpperCase()))
    dispatch(setSearch(filtered))
}

// fetches a company's financial data
// not storing in redux store
export const fetchStockDetails = (key, ticker) => async () => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${key}`)
    const json = await res.json()
    return json
}

// fetches a company's general data
export const fetchCompanyDetails = (key, ticker) => async () => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${key}`)
    const json = await res.json()
    return json
}

// fetches a company's 1 day graph
// not storing in redux store
export const fetchStockGraph = (key, ticker) => async () => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${key}`)
    const json = await res.json()
    return json
}

// fetches a company's news (1 news posting)
// not storing in redux store
export const fetchStockNews = (key, ticker) => async () => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/news/last/1?token=${key}`)
    const json = await res.json()
    return json
}

// fetches a company's news (5 news postings)
// not storing in redux store
export const fetchManyStockNews = (key, ticker) => async () => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/news/last/5?token=${key}`)
    const json = await res.json()
    return json
}

// fetch stocks for portfolio page
export const fetchPortfolioStocks = (key, ownedShares, balance) => async () => {
    const sharesArr = Object.keys(ownedShares)
    const numSharesArr = Object.values(ownedShares)
    const graphArr = []
    const arr = []
    for (let i = 0; i < sharesArr.length; i++) {
        const res = await fetch(`https://cloud.iexapis.com/stable/stock/${sharesArr[i]}/intraday-prices?token=${key}`)
        const json = await res.json()
        arr.push(json)
    }
    if (arr.length === 0) return arr;

    // loop to fill in first value
    for (let i = 0; i < arr.length; i++) {
        let eachTimeFrame = arr[i]
        for (let j = 0; j < eachTimeFrame.length; j++) {
            while (!eachTimeFrame[0].average || eachTimeFrame[j].average === 0) {
                eachTimeFrame[0].average = eachTimeFrame[j].average
            }
        }
    }

    // set up another loop to backtrack for averages in arr
    for (let i = 0; i < arr.length; i ++) {
        let eachTimeFrame = arr[i]
        for (let j = 0; j < eachTimeFrame.length; j++) {
            while (!eachTimeFrame[j].average || eachTimeFrame[j].average === 0) {
                    eachTimeFrame[j].average = eachTimeFrame[j - 1].average
                    j--
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        let eachTimeFrame = arr[i]
        let numShares = numSharesArr[i]
        if (graphArr.length === 0) {
            for (let j = 0; j < eachTimeFrame.length; j++) {
                let eachPlot = eachTimeFrame[j]
                graphArr.push({
                    "average": eachPlot["average"] * numShares + parseFloat(balance),
                    "minute": eachPlot["minute"], "label": eachPlot["label"]
                })
            }
        } else {
            for (let k = 0; k < eachTimeFrame.length; k++) {
                let eachPlot = eachTimeFrame[k]
                graphArr[k].average += (eachPlot["average"] * numShares)
            }
        }
    }
    return graphArr;
}

// fetch request to buy stock
export const buyStock = (payload) => async () => {
    const res = await fetch('/api/transactions/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            payload
        })
    })

    if (res.ok) {
        const result = await res.json()
        return result
    }
}

// fetch request to sell stock
export const sellStock = (payload) => async () => {
    const res = await fetch('/api/transactions/sell', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            payload
        })
    })

    if (res.ok) {
        const result = await res.json()
        return result
    }
}

// Define an initial state
const initialState = {}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH: {
            const newState = {}
            const arr = action.results
            if (arr.length > 5) {
                for (let i = 0; i < 5; i++) {
                    newState[arr[i].symbol] = arr[i]
                }
                return newState
            } else {
                arr.forEach(result => {
                    newState[result.symbol] = result
                })
                return newState
            }
        }
        default:
            return state;
    }
}

// Export the reducer
export default searchReducer
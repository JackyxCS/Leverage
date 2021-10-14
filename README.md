# Leverage

Given an annual inflation rate of 5.4% in 2021 and the uncertainties the pandemic and the economy have presented both recently and in past market cycles, the importance of investing in creating future financial security cannot be overstated. During a time when only 55% of Americans are participating in the financial markets, Leverage is a social investing app created to encourage more people to invest by leveraging the social engagement factor of experiencing something together with friends. Happy investing!

You can find the Leverage app here: https://aa-leverage.herokuapp.com/

## Development

* Visit the project wiki to learn more about the app development process: https://github.com/JackyxCS/Leverage/wiki

* To start the development environment:
   
   i. Clone the repository at: https://github.com/JackyxCS/Leverage
   
   ii. Install dependencies: ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```
      
   iii. Create a **.env** file based on the example with proper settings for your
   development environment
   
   iv. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file
   
   v. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

   vi. Cd into react-app and run 
   
   ```
   npm install
   ```

   ```
   npm start
   ```

## Technologies Used

* Languages
   - Python
   - JavaScript
   - HTML
   - CSS

* Database
   - PostgreSQL

* Backend
   - Flask
   - Flask-SQLAlchemy
   - SQLAlchemy
   - Node.js

* Frontend
   - React
   - Redux
   
* Deployment and Version Control
   - Git + Github
   - Heroku
   - Docker

## Features

To see the full feature list, user stories, RESTful routes, and more: https://github.com/JackyxCS/Leverage/wiki

* Users
   - Users can signup, login, login as demo, logout
   - Protected routes and authentication implemented throughout the site
* Transfers
   - Users can transfer money into and out of their account given that they have enough balance
* Dashboard
   - Users can view the aggregated chart of their account value, including their asset values and cash balance
* Search
   - Users can search for stocks by ticker and name
   - Users can search for friends
* Asset Page
   - Users can view details about a specific stock and buy/sell that stocks given that they have enough balance/enough owned shares to sell
* Watchlists
   - Users can make a comment, see other comments, update their own comments, and delete their own comments
* Friends
   - Users can like posts, see the number of likes posts have, and remove their like
* Friends Feed
   - Users can see their friends' activities/transactions
* Comments
   - Users can comment on their friends' activities/transactions
* External API
   - IEX Cloud was the API used for fetching stock details and news

## Database Structure

![](https://github.com/JackyxCS/Leverage/blob/main/design/dbdiagram.png)

## Leverage in Action

* Homepage
![](https://github.com/JackyxCS/Leverage/blob/main/design/homepage.png)
* Portfolio page
![](https://github.com/JackyxCS/Leverage/blob/main/design/portfolio.png)
* Asset page
![](https://github.com/JackyxCS/Leverage/blob/main/design/asset.png)
* Friends page
![](https://github.com/JackyxCS/Leverage/blob/main/design/friends.png)

## Code Highlights

* When fetching stock information, there are certain time periods when no shares are traded. Given that no volume is traded, the average price returned is 0 even though the value of the stock is not 0 at that particular point in time. To resolve this issue, a backtracking algorithm was implemented to look for the previous average price when an average price of 0 is encountered. If the first time period has a price is 0, a look forward is performed instead and the price is set to the price of the first transaction of the day.

```
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

```

* Another challenge lies in the fact that a user's owned stocks are not stored in the database. Instead, to evaluate a user's current stock positions, all of the user's previous transactions are aggregated to determine how many shares of which stocks they hold at any particular point in time. This is performed by the thunk below:

```
export const fetchOwnedStocks = () => async (dispatch) => {
    const res = await fetch('/api/transactions/')
    const json = await res.json()
    const data = json.transactions
    const ownedStock = {}
    for (let i = 0; i < data.length; i++) {
        let trans = data[i]
        let ticker = trans["ticker"]
        if (ownedStock[ticker] === undefined) {
            ownedStock[ticker] = parseFloat(trans["trans_quantity"])
        } else {
            ownedStock[ticker] += parseFloat(trans["trans_quantity"])
        }
    }
    dispatch(setOwnedStocks(ownedStock))
    return ownedStock
}
```

## Conclusion

* A major challenge of creating a stock-trading app is the accuracy of stock data and how that information is process and presented to the user. For Leverage, this involved fetching data from an external API and manipulating that data so that the user can seamlessly view charts for their portfolio and any stock as well as purchase and sell assets at the latest price. Creating Leverage taught me a lot about not only technical applications, but also about the user experience when dealing with important issues like money and investing.

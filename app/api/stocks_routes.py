from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, WatchList, WatchListStock

stock_routes = Blueprint('stocks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# fetches all stocks of a user on all watchlists to filter in frontend
@stock_routes.route('/', methods=['GET'])
@login_required
def getAllStocks():
    stocks = WatchListStock.query.all()
    return {'watchliststocks': [stock.to_dict() for stock in stocks]}


# creates a new stock on a watchlist using a given watchlist number and stock ticker
@stock_routes.route('/', methods=['POST'])
@login_required
def postStock():
    data = request.get_json()['stock']
    watchlistId = data['watchlistId']
    stock = data['stockticker']

    new_add = WatchListStock(
        watchListId = watchlistId,
        ticker = stock,
    )

    db.session.add(new_add)
    db.session.commit()
    return {'stock': {
        'id': new_add.id,
        'watchListId': new_add.watchListId,
        'ticker': new_add.ticker,
    }}

# deletes a stock off of a watchlist
@stock_routes.route('/<int:stockId>', methods=['DELETE'])
@login_required
def deleteStock(stockId):
    delete_stock = WatchListStock.query.filter(WatchListStock.id == stockId).first()
    db.session.delete(delete_stock)
    db.session.commit()
    return {'delete_stock': {
        'id': delete_stock.id,
        'watchListId': delete_stock.watchListId,
        'ticker': delete_stock.ticker,
    }}
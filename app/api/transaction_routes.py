from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Transfer, Transaction
from app.models import db, Transfer, User
import datetime

transaction_routes = Blueprint('transactions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@transaction_routes.route('/', methods=['GET'])
@login_required
def getTransactions():
    userId = current_user.id
    transactions = Transaction.query.filter(Transaction.userId == userId).all()
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/all', methods=['GET'])
@login_required
def getAllTransactions():
    userId = current_user.id
    transactions = Transaction.query.all()
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/stock', methods=['POST'])
@login_required
def getOneStockTransactions():
    userId = current_user.id
    data = request.get_json()["ticker"]
    transactions = Transaction.query.filter(Transaction.userId == userId, Transaction.ticker == data).all()
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/buy', methods=['POST'])
@login_required
def buyStock():
    userId = current_user.id
    data = request.get_json()["payload"]
    
    user = User.query.get(userId)
    # update user's balance
    user.balance = float(user.balance) - (float(data["transactionPrice"]) * float(data["shares"]))

    # creates new transaction row in history
    new_transaction = Transaction(
        userId = userId,
        ticker = data["stockticker"],
        trade_price = data["transactionPrice"],
        trans_quantity = data["shares"],
        datetime = datetime.datetime.utcnow()
    )

    db.session.add(new_transaction)
    db.session.commit()
    return user.to_dict()

@transaction_routes.route('/sell', methods=['POST'])
@login_required
def sellStock():
    userId = current_user.id
    data = request.get_json()["payload"]

    user = User.query.get(userId)
    # update user's balance
    user.balance = float(user.balance) - (float(data["transactionPrice"]) * float(data["sell_shares"]))

    # creates new transaction row in history
    new_transaction = Transaction(
        userId = userId,
        ticker = data["stockticker"],
        trade_price = data["transactionPrice"],
        trans_quantity = data["sell_shares"],
        datetime = datetime.datetime.utcnow()
    )

    db.session.add(new_transaction)
    db.session.commit()
    return user.to_dict()

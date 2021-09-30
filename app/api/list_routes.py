from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, WatchList

list_routes = Blueprint('lists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# fetches all lists of a user to place in state
@list_routes.route('/', methods=['GET'])
@login_required
def getAllLists():
    userId = current_user.id
    watchlists = WatchList.query.filter(WatchList.userId == userId).all()
    return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}

# creates a new list for a particular user
@list_routes.route('/', methods=['POST'])
@login_required
def postList():
    data = request.get_json()["watchlist"]
    userId = data["userId"]
    title = data["watchList"]

    new_list = WatchList(
        userId = userId,
        title = title
    )

    db.session.add(new_list)
    db.session.commit()
    return {'list': {
        'id': new_list.id,
        'userId': new_list.userId,
        'title': new_list.title,
    }}

# updates list title for a particular user
@list_routes.route('/<int:listId>', methods=["PUT"])
@login_required
def updateList(listId):
    data = request.get_json()["watchlist"]
    title = data["watchListName"]
    found_list = WatchList.query.filter(WatchList.id == listId).all()
    found_list[0].title = title
    db.session.commit()
    return {'updated_list': {
        'id': found_list[0].id,
        'userId': found_list[0].userId,
        'title': found_list[0].title,
    }}

# deletes list for a particular user
@list_routes.route('/<int:listId>', methods=["DELETE"])
@login_required
def deleteList(listId):
    delete_list = WatchList.query.filter(WatchList.id == listId).first()
    db.session.delete(delete_list)
    db.session.commit()
    return {'deleted_list': {
        'id': delete_list.id,
        'userId': delete_list.userId,
        'title': delete_list.title,
    }}
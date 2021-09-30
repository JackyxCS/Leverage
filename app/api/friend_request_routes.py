from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import db, User, WatchList, friend_requests

friend_request_routes = Blueprint('friend_request_routes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# fetches all friend requests to and from of a user to place in state
@friend_request_routes.route('/', methods=['GET'])
@login_required
def getAllFriendRequests():
    all_requests = db.session.query(friend_requests).all()
    # requester, requestee in tuple (3, 1)
    returnArr = []
    for request in all_requests:
        request_obj = {}
        request_obj[request[0]] = request[1]
        returnArr.append(request_obj)
    print(returnArr, 'RETURNARR<<<<<<<')
    return jsonify({'requests': returnArr})

# adds friend request
@friend_request_routes.route('/', methods=['POST'])
@login_required
def addFriendRequest():
    data = request.get_json()["friendRequest"]
    requesteeId = data["id"]
    userId = current_user.id
    user = User.query.filter(User.id == userId).first()
    requestee = User.query.filter(User.id == requesteeId).first()
    user.friend_requests_to.append(requestee)
    # print(user.friend_requests_to, "REQUESTS TO")
    requestee.friend_requests_from.append(user)
    db.session.commit()
    return 'added'

# deletes friend request that was sent
@friend_request_routes.route('/<int:friendRequestId>', methods=['DELETE'])
@login_required
def deleteFriendRequest(friendRequestId):
    userId = current_user.id
    print('in delete request route')
    requestee = User.query.filter(User.id == friendRequestId).first()
    requester = User.query.filter(User.id == userId).first()
    # deleting one side of the relationship deletes the entire row from the table
    if (requestee in requester.friend_requests_to):
        requester.friend_requests_to.remove(requestee)
    elif (requestee in requester.friend_requests_from):
        requester.friend_requests_from.remove(requestee)
    # requestee.friend_requests_from.remove(requester)
    db.session.commit()
    return 'deleted'
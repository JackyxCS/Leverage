from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import db, User, WatchList, friends

friend_routes = Blueprint('friends', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# fetches all friends of a user to place in state
@friend_routes.route('/', methods=['GET'])
@login_required
def getAllFriends():
    userId = current_user.id
    all_friends = db.session.query(friends).all()
    friend_obj = {}
    for friend in all_friends:
        if (friend[0] == userId):
            friend_obj[friend[1]] = friend[0]
    return {'friends': friend_obj}

# adds friend on both sides of relationship
@friend_routes.route('/', methods=['POST'])
@login_required
def postFriend():
    userId = current_user.id
    data = request.get_json()["friend"]
    friendId = data["id"]
    user = User.query.filter(User.id == userId).first()
    friend = User.query.filter(User.id == friendId).first()
    user.friends.append(friend)
    friend.friends.append(user)
    db.session.commit()
    return 'posted'

# deletes friend of a particular user
@friend_routes.route('/<int:friendId>', methods=["DELETE"])
@login_required
def deleteFriend(friendId):
    userId = current_user.id
    user = User.query.filter(User.id == userId).first()
    friend = User.query.filter(User.id == friendId).first()
    user.friends.remove(friend)
    friend.friends.remove(user)
    db.session.commit()
    return 'deleted'
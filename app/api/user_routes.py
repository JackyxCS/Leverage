from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from app.forms import MakeTransferForm
from app.models import db, Transfer, User

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/search')
# @login_required
# def searchUser():
#     data = request.get_json()["searchInput"]
#     string = data["search"]
#     foundUser = User.query.filter(User.username == string).all()
#     return {'user': {}}
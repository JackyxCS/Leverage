from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, WatchList, Comment

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# fetches all comments and stores in redux
@comment_routes.route('/', methods=['GET'])
def getAllComments():
    comments = Comment.query.all()
    return {'comments' : [comment.to_dict() for comment in comments]}

# post a comment
@comment_routes.route('/', methods=['POST'])
def postComment():
    data = request.get_json()["comment"]
    userId = data["userId"]
    transactionId = data["transactionId"]
    comment = data["comment"]

    new_comment = Comment(
        userId = userId,
        transactionId = transactionId,
        comment = comment,
    )
    
    db.session.add(new_comment)
    db.session.commit()

    return {'comment': {
        'id': new_comment.id,
        'userId': new_comment.userId,
        'transactionId': new_comment.transactionId,
        'comment': new_comment.comment,
    }}

# edit a comment's contents
@comment_routes.route('/<int:commentId>', methods=["PUT"])
@login_required
def updateComment(commentId):
    data = request.get_json()["comment"]

    comment = data["updatedComment"]

    single_comment = Comment.query.filter(Comment.id == commentId).all()
   
    single_comment[0].comment = comment

    db.session.commit()
    return {'single_comment': {
        'id': single_comment[0].id,
        'userId': single_comment[0].userId,
        'transactionId': single_comment[0].transactionId,
        'comment': single_comment[0].comment,
    }}

# delete a comment
@comment_routes.route('/<int:commentId>', methods=["DELETE"])
@login_required
def deleteComment(commentId):
    delete_comment = Comment.query.filter(Comment.id == commentId).first()
    db.session.delete(delete_comment)
    db.session.commit()
    return {'deleted_comment': {
        'id': delete_comment.id,
        'userId': delete_comment.userId,
        'transactionId': delete_comment.transactionId,
        'comment': delete_comment.comment,
    }}
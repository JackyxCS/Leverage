from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Transfer

transfer_routes = Blueprint('transfers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@transfer_routes.route('/', methods=['GET'])
@login_required
def getUserTransfers():
    userId = current_user.id
    transfers = Transfer.query.filter(Transfer.userId == userId).all()
    return {'transfers': [transfer.to_dict() for transfer in transfers]}

# available balance checking on frontend
@transfer_routes.route('/', methods=['POST'])
@login_required
def makeTransfers():
    userId = current_user.id
    form = MakeTransferForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transfer_type = form.data["transfer_type"]
        transfer_amount = form.data["transfer_amount"]

        user = User.query.get(userId)

        if transfer_type == "DEPOSIT":
            user.balanace = user.balance + transfer_amount
        elif transfer_type == "WITHDRAW":
            user.balanace = user.balance - transfer_amount
        
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
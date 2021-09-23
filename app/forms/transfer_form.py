from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired


class MakeTransferForm(FlaskForm):
    transferType = StringField('transferType', validators=[DataRequired()])
    amount = DecimalField('amount', validators=[DataRequired()])
from flask_wtf import FlaskForm
from wtforms import DecimalField
from wtforms.validators import DataRequired


class UpdateUserForm(FlaskForm):
    balance = DecimalField('balance', validators=[DataRequired()])

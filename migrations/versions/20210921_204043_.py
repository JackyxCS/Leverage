"""empty message

Revision ID: 1adf0660d03d
Revises: 53485097f838
Create Date: 2021-09-21 20:40:43.623277

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1adf0660d03d'
down_revision = '53485097f838'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('friends', 'friend1_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('friends', 'friend2_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('friends', 'friend2_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('friends', 'friend1_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###

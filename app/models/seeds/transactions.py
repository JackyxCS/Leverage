from app.models import db, Transaction

def seed_transactions():
    trans1 = Transaction(
        userId=1,
        ticker='aapl',
        trade_price=145.85,
        trans_quantity=5,
    )


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
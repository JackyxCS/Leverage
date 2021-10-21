from app.models import db, Transaction

def seed_transactions():
    trans1 = Transaction(
        userId=1,
        ticker='aapl',
        trade_price=145.85,
        trans_quantity=5,
    )
    trans2 = Transaction(
        userId=2,
        ticker='aapl',
        trade_price=145.85,
        trans_quantity=2,
    )
    trans3 = Transaction(
        userId=3,
        ticker='ibm',
        trade_price=131.17,
        trans_quantity=2,
    )
    trans4 = Transaction(
        userId=6,
        ticker='ibm',
        trade_price=130.15,
        trans_quantity=2,
    )

    db.session.add(trans1)
    db.session.add(trans2)
    db.session.add(trans3)
    db.session.add(trans4)
    db.session.commit()

def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
from app.models import db, User, WatchList

def seed_watchlists():
    watchlist1 = WatchList(
        userId=1,
        title="My Favorites"
    )
    watchlist2 = WatchList(
        userId=1,
        title="Risky"
    )
    watchlist3 = WatchList(
        userId=1,
        title="Dividend Stocks"
    )

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)
    db.session.commit()

def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
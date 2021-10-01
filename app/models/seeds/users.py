from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', balance=5000.00)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', balance=0.00)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', balance=0.00)
    jacky = User(
        username='Jacky', email='jacky@jacky.com', password='password', balance=1000.00)
    sarah = User(
        username='Sarah', email='sarah90@gmail.com', password='password', balance=500.00)
    matt = User(
        username='Matt', email='matt88@yahoo.com', password='password', balance=2000.00
    )


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jacky)
    db.session.add(sarah)
    db.session.add(matt)

    demo.friends.append(marnie)
    demo.friends.append(bobbie)
    
    marnie.friends.append(demo)
    bobbie.friends.append(demo)

    demo.friend_requests_to.append(sarah)
    matt.friend_requests_to.append(demo)

    db.session.commit()

    # example for structuring friends and friend requests
    # print(demo.friends, "demo's friends")
    # print(marnie.friends, "marnie's friends")
    # print(demo.friend_requests_to, "demos requests")
    # print(bobbie.friend_requests_from, "bobbie's received requests")
    

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

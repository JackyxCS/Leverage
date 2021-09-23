from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

friends = db.Table('friends',
    db.Column('friend1_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend2_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
)

friend_requests = db.Table('friend_requests',
    db.Column('requester_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('requestee_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    balance = db.Column(db.Numeric(10,2), nullable=False, default=0.00)
    holdings_value = db.Column(db.Numeric(10,2), nullable=False, default=0.00)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    transaction_details = db.relationship("Transaction", back_populates="user_details", cascade="all, delete")
    watchlist_details = db.relationship("WatchList", back_populates="user_details", cascade="all, delete")
    transfer_details = db.relationship("Transfer", back_populates="user_details", cascade="all, delete")
    reaction_details = db.relationship("Reaction", back_populates="user_details", cascade="all, delete")
    comment_details = db.relationship("Comment", back_populates="user_details", cascade="all, delete")
    friend_requests_to = db.relationship('User', 
        secondary="friend_requests", 
        primaryjoin=id==friend_requests.c.requester_id,
        secondaryjoin=id==friend_requests.c.requestee_id,
        backref="friend_requests_from"
        )
    friends = db.relationship('User', 
        secondary="friends", 
        primaryjoin="User.id==friends.c.friend1_id",
        secondaryjoin="User.id==friends.c.friend2_id"
        # backref="current_friends"
        )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'balance': str(self.balance),
            'holdings_value': str(self.holdings_value),
            'createdAt': self.createdAt,
            # 'friend_requests': self.friend_requests,
            # 'friends': self.friends
            # 'transaction_details': self.transaction_details.to_dict(),
            # 'watchlist_details': self.watchlist_details.to_dict(),
            # 'transfer_details': self.transfer_details.to_dict(),
            # 'reaction_details': self.reaction_details.to_dict(),
            # 'comment_details': self.comment_details.to_dict(),
        }

class Transaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ticker = db.Column(db.String, nullable=False)
    trade_price = db.Column(db.Numeric(10,2), nullable=False)
    trans_quantity = db.Column(db.Numeric(10,2), nullable=False)
    datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user_details = db.relationship("User", back_populates="transaction_details")
    reaction_details = db.relationship("Reaction", back_populates="transaction_details")
    comment_details = db.relationship("Comment", back_populates="transaction_details")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'ticker': self.ticker,
            'trade_price': str(self.trade_price),
            'trans_quantity': str(self.trans_quantity),
            'datetime': self.datetime,
            # 'user_details': self.user_details.to_dict(),
            # 'reaction_details': self.reaction_details.to_dict(),
            # 'comment_details': self.comment_details.to_dict(),
        }

class WatchList(db.Model):
    __tablename__ = "watchlists"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String, nullable=False)
    user_details = db.relationship("User", back_populates="watchlist_details")
    stock_details = db.relationship("WatchListStock", back_populates="watchlist_details")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'user_details': self.user_details.to_dict(),
            'stock_details': self.stock_details.to_dict(),
        }

class WatchListStock(db.Model):
    __tablename__ = "watchliststocks"
    id = db.Column(db.Integer, primary_key=True)
    watchListId = db.Column(db.Integer, db.ForeignKey("watchlists.id"), nullable=False)
    ticker = db.Column(db.String, nullable=False)
    company_name = db.Column(db.String, nullable=False)
    watchlist_details = db.relationship("WatchList", back_populates="stock_details")

    def to_dict(self):
        return {
            'id': self.id,
            'watchListId': self.watchListId,
            'ticker': self.ticker,
            'company_name': self.company_name,
        }

class Transfer(db.Model):
    __tablename__ = "transfers"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    transfer_type = db.Column(db.String, nullable=False)
    transfer_amount = db.Column(db.Numeric(10,2), nullable=False)
    datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user_details = db.relationship("User", back_populates="transfer_details")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'transfer_type': self.transfer_type,
            'transfer_amount': str(self.transfer_amount),
            'datetime': self.datetime,
            'user_details': self.user_details.to_dict(),
        }

# class FriendRequest(db.Model):
#     __tablename__ = "friendrequests"
#     id = db.Column(db.Integer)
#     requesterId = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
#     requesteeId = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'requesterId': self.requesterId,
#             'requesteeId': self.requesteeId,
#         }

# class Friend(db.Model):
#     __tablename__ = 'friends'
#     id = db.Column(db.Integer)
#     userId = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
#     friendId = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'userId': self.userId,
#             'friendId': self.friendId,
#         }

class Reaction(db.Model):
    __tablename__ = "reactions"
    id = db.Column(db.Integer, primary_key=True)
    transactionId = db.Column(db.Integer, db.ForeignKey("transactions.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    thumbs_up = db.Column(db.Boolean, nullable=False, default=False)
    heart_react = db.Column(db.Boolean, nullable=False, default=False)
    sad_react = db.Column(db.Boolean, nullable=False, default=False)
    angry_react = db.Column(db.Boolean, nullable=False, default=False)
    user_details = db.relationship("User", back_populates="reaction_details")
    transaction_details = db.relationship("Transaction", back_populates="reaction_details")

    def to_dict(self):
        return {
            'id': self.id,
            'transactionId': self.transactionId,
            'userId': self.userId,
            'thumbs_up': self.thumbs_up,
            'heart_react': self.heart_react,
            'sad_react': self.sad_react,
            'angry_react': self.angry_react,
            'user_details': self.user_details.to_dict(),
            # 'transaction_details': self.transaction_details.to_dict(),
        }

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    transactionId = db.Column(db.Integer, db.ForeignKey("transactions.id"), nullable=False)
    comment = db.Column(db.String, nullable=False)
    user_details = db.relationship("User", back_populates="comment_details")
    transaction_details = db.relationship("Transaction", back_populates="comment_details")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'transactionId': self.transactionId,
            'comment': self.comment,
            # 'user_details': self.user_details.to_dict(),
        }
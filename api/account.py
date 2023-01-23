from models import Account, accounts_schema
from setup import db

def get_all():
    """
    Get all accounts.
    """
    users = Account.query.all()
    return accounts_schema.dump(users)


def try_login(body):
    """
    Called when trying to login.
    """
    user = Account.query.filter(Account.username == body['username'],
                                Account.password == body['passwdhash']).one_or_none()

    if user is not None:
        return {"user_id": user.id}, 200
    return {"user_id": None, "error": "Wrong user or password"}, 401

def try_create_account(body):
    """
    Called when trying to register a new account. If username already exists, return 400.
    """
    user = Account.query.filter(Account.username == body['username']).all()
    if len(user) == 0:
        new_account = Account()
        new_account.username = body['username']
        new_account.password = body['passwdhash']
        db.session.add(new_account)
        db.session.commit()
        return {"user_id": new_account.id}, 200

    return {"user_id": None, "error": "Username already exists"}, 400
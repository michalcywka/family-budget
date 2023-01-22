# from setup import db
from models import Account, accounts_schema
from setup import db

def get_all():
    """
    Get all accounts
    """
    users = Account.query.all()
    return accounts_schema.dump(users)


def try_login(body):
    user = Account.query.filter(Account.username == body['username'],
                                Account.password == body['passwdhash']).one_or_none()

    if user is not None:
        return {"found": True}, 200
    return {"found": False}, 401

def try_create_account(body):
    user = Account.query.filter(Account.username == body['username']).all()
    if len(user) == 0:
        new_account = Account()
        new_account.username = body['username']
        new_account.password = body['passwdhash']
        db.session.add(new_account)
        db.session.commit()
        return {"userCreated": True}, 200

    return {"userCreated": False, "error": "Username already exists"}, 400
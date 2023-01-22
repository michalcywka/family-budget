# from setup import db
from models import Account, accounts_schema

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

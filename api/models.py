from setup import db, ma

class Account(db.Model):

    __tablename__ = "account"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(48))
    password = db.Column(db.String(64))

class AccountSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Account
        load_instance = True
        sqla_session = db.session

account_schema = AccountSchema()
accounts_schema = AccountSchema(many=True)
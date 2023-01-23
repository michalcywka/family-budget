"""
ORM models for SQLAlchemy.
"""
from setup import db, ma


class Account(db.Model):
    """
    Account table model.
    """
    __tablename__ = "account"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(48))
    password = db.Column(db.String(64))


class AccountSchema(ma.SQLAlchemyAutoSchema):
    """
    Marshmallow schema for Account table model.
    """
    class Meta:
        model = Account
        load_instance = True
        sqla_session = db.session


class Budget(db.Model):
    """
    Budget table model.
    """
    __tablename__ = "budget"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    income = db.Column(db.Integer)


class BudgetSchema(ma.SQLAlchemyAutoSchema):
    """
    Marshmallow schema for Budget table model.
    """
    class Meta:
        model = Budget
        load_instance = True
        sqla_session = db.session


class Expense(db.Model):
    """
    Expense table model.
    """
    __tablename__ = "expense"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    budget_id = db.Column(db.Integer)
    category_id = db.Column(db.Integer)


class ExpenseSchema(ma.SQLAlchemyAutoSchema):
    """
    Marshmallow schema for Expense table model.
    """
    class Meta:
        model = Expense
        load_instance = True
        sqla_session = db.session


class Category(db.Model):
    """
    Category table model.
    """
    __tablename__ = "category"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))


class CategorySchema(ma.SQLAlchemyAutoSchema):
    """
    Marshmallow schema for Category table model.
    """
    class Meta:
        model = Category
        load_instance = True
        sqla_session = db.session


class AccountBudget(db.Model):
    """
    Account_budget table model.
    """
    __tablename__ = "account_budget"
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey("account.id"))
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.id"))


class AccountBudgetSchema(ma.SQLAlchemyAutoSchema):
    """
    Marshmallow schema for AccountBudget table model.
    """
    class Meta:
        model = AccountBudget
        load_instance = True
        sqla_session = db.session


class BudgetExpense(db.Model):
    """
    Budget_expense table model.
    """
    __tablename__ = "budget_expense"
    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer)
    budget_id = db.Column(db.Integer)


class BudgetExpenseSchema(ma.SQLAlchemyAutoSchema):
    """
    Marshmallow schema for BudgetExpense table model.
    """
    class Meta:
        model = BudgetExpense
        load_instance = True
        sqla_session = db.session


account_schema = AccountSchema()
accounts_schema = AccountSchema(many=True)
budget_schema = BudgetSchema()
budgets_schema = BudgetSchema(many=True)
expense_schema = ExpenseSchema()
expenses_schema = ExpenseSchema(many=True)
category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)
accountbudget_schema = AccountBudgetSchema()
accountsbudgets_schema = AccountBudgetSchema(many=True)
budgetexpense_schema = BudgetExpenseSchema()
budgetsexpenses_schema = BudgetExpenseSchema(many=True)

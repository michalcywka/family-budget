from models import Budget, AccountBudget, budgets_schema

def get_by_user(user_id):
    """
    Get all budgets available for a user (shared and owned).
    """
    user_budgets = Budget.query.join(AccountBudget).filter(AccountBudget.account_id == user_id).all()
    
    return budgets_schema.dump(user_budgets)
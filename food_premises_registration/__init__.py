import os
from food_premises_registration.factory import create_app
app = create_app(os.environ['SETTINGS'])

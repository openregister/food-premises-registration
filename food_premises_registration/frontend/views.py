from flask import (
    current_app,
    Blueprint,
    render_template,

)

frontend = Blueprint('frontend', __name__, template_folder='templates')

headers = {"Content-type": "application/json"}


@frontend.route('/')
def index():
    return render_template('index.html')


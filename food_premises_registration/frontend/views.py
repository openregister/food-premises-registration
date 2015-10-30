import requests

from flask import (
    current_app,
    Blueprint,
    render_template,
    Response,
    request
)

frontend = Blueprint('frontend', __name__, template_folder='templates')

headers = {"Content-type": "application/json"}


@frontend.route('/')
def index():
    address_register = current_app.config['ADDRESS_REGISTER']
    return render_template('index.html', address_register=address_register)

@frontend.route('/address-search')
def search():
    return Response(requests.get(current_app.config['ADDRESS_SEARCH'], params=request.args).content,
                    mimetype='application/json')


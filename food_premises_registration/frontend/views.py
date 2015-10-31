import requests

from flask import (
    current_app,
    Blueprint,
    render_template,
    Response,
    request,
    jsonify
)

frontend = Blueprint('frontend', __name__, template_folder='templates')

companies_house_url = 'https://beta.companieshouse.gov.uk/search/companies'
headers = {'Accept': 'application/json, text/javascript'}


@frontend.route('/')
def index():
    address_register = current_app.config['ADDRESS_REGISTER']
    return render_template('index.html', address_register=address_register)


@frontend.route('/address-search')
def address_search():
    return Response(requests.get(current_app.config['ADDRESS_SEARCH'], params=request.args).content,
                    mimetype='application/json')


@frontend.route('/company-search')
def company_search():
    params = {'q': request.args['q'], 'page': 1}
    resp = requests.get(companies_house_url, headers=headers, params=params)
    results = resp.json()['items']
    companies = []
    for item in results:
        company = {}
        company['company_number'] = item['company_number']
        company['title'] = item['title']
        company['snippet'] = item['snippet']
        companies.append(company)
    return jsonify({'companies': companies})

from config import app
from flask import make_response, request

from models import db, Companies, Open_Positions, Contact, Outreach

@app.route("/companies", methods=["GET"])
def companies():

    companies = Companies.query.all()

    companies_to_dict = [company.to_dict(rules = ("-open_positions", )) for company in companies]

    response = make_response(
        companies_to_dict,
        200
    )

    return response

@app.route("/companies/<int:id>", methods=["GET"])
def company(id):

    company = Companies.query.filter(Companies.id == id).first()

    if company:

        response = make_response(
            company.to_dict(),
            200
        )

    else:

        response = make_response(
            {"error" : "company not found"},
            404
        )

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
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

@app.route("/open_positions", methods = ["GET"])
def open_positions():

    open_positions = Open_Positions.query.all()

    open_positions_to_dict = [open_position.to_dict(rules = ("-companies", "-contacts")) for open_position in open_positions] 

    response = make_response(
        open_positions_to_dict,
        200
    )

    return response

@app.route("/open_positions/<int:id>", methods = ["GET"])
def open_position(id):

    open_position = Open_Positions.query.filter(Open_Positions.id == id).first()

    if open_position:

        response = make_response(
            open_position.to_dict(),
            200
        )

    else: 

        response = make_response(
            {"error" : "open position not found"},
            404
        )

    return response

@app.route("/contacts", methods = ["GET"])
def contacts():

    contacts = Contact.query.all()

    contacts_to_dict = [contact.to_dict(rules = ("-open_positions", "-outreach")) for contact in contacts] 

    response = make_response(
        contacts_to_dict,
        200
    )

    return response

@app.route("/contacts/<int:id>", methods = ["GET"])
def contact(id):

    contact = Contact.query.filter(Contact.id == id).first()

    if contact:

        response = make_response(
            contact.to_dict(),
            200
        )

    else: 

        response = make_response(
            {"error" : "open position not found"},
            404
        )

    return response

@app.route("/outreach", methods = ["GET"])
def outreach():

    all_outreach = Outreach.query.all()

    all_outreach_to_dict = [outreach.to_dict(rules = ("-contacts", )) for outreach in all_outreach] 

    response = make_response(
        all_outreach_to_dict,
        200
    )

    return response

@app.route("/outreach/<int:id>", methods = ["GET"])
def outreach_by_id(id):

    outreach = Outreach.query.filter(Outreach.id == id).first()

    if outreach:

        response = make_response(
            outreach.to_dict(),
            200
        )

    else: 

        response = make_response(
            {"error" : "open position not found"},
            404
        )

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
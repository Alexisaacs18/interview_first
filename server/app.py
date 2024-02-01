from config import app
from flask import make_response, request

from models import db, Companies, Open_Positions, Contact

@app.route("/companies", methods=["GET", "POST"])
def companies():

    if request.method == "GET":

        companies = Companies.query.all()

        companies_to_dict = [company.to_dict(rules = ("-open_positions", )) for company in companies]

        response = make_response(
            companies_to_dict,
            200
        )

    elif request.method == "POST":

        form_data = request.get_json()

        new_company = Companies(
            name = form_data["name"],
            amount_of_employees = form_data["amount_of_employees"],
            total_open_positions = form_data["total_open_positions"]
        )

        db.session.add(new_company)
        db.session.commit()

        response = make_response(
            new_company.to_dict(),
            201
        )

    else:

        response = make_response(
            {"error" : "method not allowed"},
            400
        )
        

    return response

@app.route("/companies/<int:id>", methods=["GET", "PATCH", "DELETE"])
def company(id):

    company = Companies.query.filter(Companies.id == id).first()

    if company:

        if request.method == "GET":

            response = make_response(
                company.to_dict(),
                200
            )

        elif request.method == "PATCH":

            form_data = request.get_json()

            for key in form_data:
                setattr(company, key, form_data[key])

            db.session.commit()

            response = make_response(
                company.to_dict(),
                201
            )

        
        elif request.method == "DELETE":

            db.session.delete(company)
            db.session.commit()

            response = make_response(
                {},
                201
            )

        else:

            response = make_response(
                {"error" : "method not allowed"},
                400
            )

    else:

        response = make_response(
            {"error" : "company not found"},
            404
        )

    return response

@app.route("/open_positions", methods = ["GET", "POST"])
def open_positions():

    if request.method == "GET":

        open_positions = Open_Positions.query.all()

        open_positions_to_dict = [open_position.to_dict(rules = ("-companies", "-contacts")) for open_position in open_positions] 

        response = make_response(
            open_positions_to_dict,
            200
        )

    elif request.method == "POST":

        form_data = request.get_json()

        new_open_position = Open_Positions(
            company_id = form_data["company_id"],
            contact_id = form_data["contact_id"],
            position = form_data["position"],
            salary_range = form_data["salary_range"],
            position_status = form_data["position_status"]
        )

        db.session.add(new_open_position)
        db.session.commit()

        response = make_response(
            new_open_position.to_dict(),
            201
        )

    else:

        response = make_response(
            {"error" : "method not allowed"},
            400
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

@app.route("/contacts", methods = ["GET", "POST"])
def contacts():

    if request.method == "GET":

        contacts = Contact.query.all()

        contacts_to_dict = [contact.to_dict(rules = ("-open_positions", "-outreach")) for contact in contacts] 

        response = make_response(
            contacts_to_dict,
            200
        )

    elif request.method == "POST":

        form_data = request.get_json()

        new_contact = Contact(
            outreach_id = form_data["outreach_id"],
            name = form_data["name"],
            linkedin_url = form_data["linkedin_url"],
            position = form_data["position"],
            length_of_position = form_data["length_of_position"]
        )

        db.session.add(new_contact)
        db.session.commit()

        response = make_response(
            new_contact.to_dict(),
            201
        )

    else:

        response = make_response(
            {"error" : "method not allowed"},
            400
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)
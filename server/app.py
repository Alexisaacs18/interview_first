from config import app
from flask import make_response, request, session, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, Companies, Open_Positions, Contact, Login
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager, decode_token


app.config['JWT_SECRET_KEY'] = 'my_secret_key'

jwt = JWTManager(app)

def get_login(request):
    
    headers = request.headers 
    access_token = headers.get('Authorization')

    token = access_token.split(' ')[1]
    login_id = decode_token(token)["sub"]
    return login_id


@app.route("/companies", methods=["GET", "POST"])
@jwt_required()
def companies():

    current_user = get_jwt_identity()

    if request.method == "GET":

        companies = Companies.query.filter(Companies.login_id == current_user).all()

        companies_to_dict = [company.to_dict(rules = ("-open_positions", )) for company in companies]

        response = make_response(
            companies_to_dict,
            200
        )
        
    elif request.method == "POST":

        try:

            form_data = request.get_json()

            new_company = Companies(
                login_id = current_user,
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

        except Exception as e:
            
            db.session.rollback()
            return jsonify({"error": "Failed to add favorite exercise", "details": str(e)}), 500


    else:

        response = make_response(
            {"error" : "method not allowed"},
            400
        )
        

    return response

@app.route("/companies/<int:id>", methods=["GET", "PATCH", "DELETE"])
@jwt_required()
def company(id):

    current_user = get_jwt_identity()

    company = Companies.query.filter(Companies.id == id, Companies.login_id == current_user).first()

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
@jwt_required()
def open_positions():

    current_user = get_jwt_identity()

    if request.method == "GET":

        open_positions = Open_Positions.query.filter(Open_Positions.login_id == current_user).all()

        open_positions_to_dict = [open_position.to_dict(rules = ("-companies", "-contacts")) for open_position in open_positions] 

        response = make_response(
            open_positions_to_dict,
            200
        )

    elif request.method == "POST":

        form_data = request.get_json()

        new_open_position = Open_Positions(
            login_id = current_user,
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

@app.route("/open_positions/<int:id>", methods = ["GET", "PATCH", "DELETE"])
@jwt_required()
def open_position(id):

    current_user = get_jwt_identity()

    open_position = Open_Positions.query.filter(Open_Positions.id == id, Open_Positions.login_id == current_user).first()

    if open_position:

        if request.method == "GET":

            response = make_response(
                open_position.to_dict(),
                200
            )

        elif request.method == "PATCH":

            form_data = request.get_json()

            for key in form_data:
                setattr(open_position, key, form_data[key])

            db.session.commit()

            response = make_response(
                open_position.to_dict(),
                201
            )

        
        elif request.method == "DELETE":

            db.session.delete(open_position)
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
            {"error" : "open position not found"},
            404
        )

    return response

@app.route("/contacts", methods = ["GET", "POST"])
@jwt_required()
def contacts():

    current_user = get_jwt_identity()

    if request.method == "GET":

        contacts = Contact.query.filter(Contact.login_id == current_user).all()

        contacts_to_dict = [contact.to_dict(rules = ("-open_positions", "-outreach")) for contact in contacts] 

        response = make_response(
            contacts_to_dict,
            200
        )

    elif request.method == "POST":

        form_data = request.get_json()

        new_contact = Contact(
            login_id = current_user,
            name = form_data["name"],
            linkedin_url = form_data["linkedin_url"],
            position = form_data["position"],
            length_of_position = form_data["length_of_position"],
            connected = form_data["connected"],
            sent_messages = form_data["sent_messages"],
            replied = form_data["replied"],
            tone = form_data["tone"]
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

@app.route("/contacts/<int:id>", methods = ["GET", "PATCH", "DELETE"])
@jwt_required()
def contact(id):

    current_user = get_jwt_identity()

    contact = Contact.query.filter(Contact.id == id, Contact.login_id == current_user).first()

    if contact:

        if request.method == "GET":

            response = make_response(
                contact.to_dict(),
                200
            )

        elif request.method == "PATCH":

            form_data = request.get_json()

            for key in form_data:
                setattr(contact, key, form_data[key])

            db.session.commit()

            response = make_response(
                contact.to_dict(),
                201
            )

        
        elif request.method == "DELETE":

            db.session.delete(contact)
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
            {"error" : "open position not found"},
            404
        )

    return response

@app.route('/login', methods = ["GET", "POST"])
def login():

    if request.method == "GET":

        logins = Login.query.all()

        logins_to_dict = [login.to_dict(rules = ("-companies", "-contacts", "-open_positions")) for login in logins]

        response = make_response(
            logins_to_dict,
            200
        )

        return response

    elif request.method == "POST":

        form_data = request.get_json()

        email = form_data["email"]
        password = form_data["password"]

        login_email = Login.query.filter_by(email = email).first()

        if not login_email or not login_email.check_password(password):
            return {"error" : "invalid username or password"}, 401
        
        access_token = create_access_token(identity=login_email.id)
        response = {"access_token":access_token}

        return jsonify(response), 200

@app.route('/signup', methods = ["POST"])
def signup():

    try:

        form_data = request.get_json()

        email = form_data["email"]
        password = form_data["password"]

        existing_email = Login.query.filter(Login.email == email).first()

        if existing_email:
            return jsonify({'Error' : 'Email already exists'}), 400
        
        new_email = Login(email = email)
        new_email.set_password(password)

        db.session.add(new_email)
        db.session.commit()

        access_token = create_access_token(identity=new_email.id)
        response = {"access_token" : access_token}

        if not email or not password:
            return jsonify({"error": "Username and password are required"}), 400

        return jsonify(response), 201
    
    except Exception as e:

        print("Registration error:", str(e))
        return jsonify({"error": "An error occurred during registration"}), 500 
    
@app.route('/logout', methods = ["POST"])
def logout():

    session.clear()
    return jsonify({"message": "logout successful"}), 201

if __name__ == '__main__':
    app.run(port=5555, debug=True)
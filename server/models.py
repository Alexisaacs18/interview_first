from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Companies(db.Model, SerializerMixin):
    __tablename__ = "companies"

    serialize_rules = ("-open_positions.companies", "-login")

    id = db.Column(db.Integer, primary_key=True)
    login_id = db.Column(db.Integer, db.ForeignKey('login.id'))
    name = db.Column(db.String, nullable=False)
    amount_of_employees = db.Column(db.String)
    total_open_positions = db.Column(db.Integer)

    open_positions = db.relationship("Open_Positions", back_populates = "companies", cascade = "all,delete")
    login = db.relationship("Login", back_populates="companies")

    @validates("name")
    def validate_name(self, key, val):
        return val
    
    @validates("amount_of_employees")
    def validate_amount_of_employees(self, key, val):
        return val
    
    @validates("total_open_positions")
    def validate_total_open_positions(self, key, val):
        return val


class Open_Positions(db.Model, SerializerMixin):
    __tablename__ = "open_positions"

    serialize_rules = ("-companies.open_positions", "-contacts.open_positions", "-login")

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"))
    contact_id = db.Column(db.Integer, db.ForeignKey("contact.id"))
    login_id = db.Column(db.Integer, db.ForeignKey('login.id'))
    position = db.Column(db.String)
    salary_range = db.Column(db.String)
    position_status = db.Column(db.Boolean)

    companies = db.relationship("Companies", back_populates = "open_positions")
    contacts = db.relationship("Contact", back_populates = "open_positions")
    login = db.relationship("Login", back_populates="open_positions")

class Contact(db.Model, SerializerMixin):
    __tablename__ = "contact"

    serialize_rules = ("-open_positions.contacts", "-login")

    id = db.Column(db.Integer, primary_key=True)
    login_id = db.Column(db.Integer, db.ForeignKey('login.id'))
    name = db.Column(db.String)
    linkedin_url = db.Column(db.String)
    position = db.Column(db.String)
    length_of_position = db.Column(db.String)
    connected = db.Column(db.Boolean)
    sent_messages = db.Column(db.Integer)
    replied = db.Column(db.Boolean)
    tone = db.Column(db.Boolean)

    open_positions = db.relationship("Open_Positions", back_populates = "contacts")
    login = db.relationship("Login", back_populates="contacts")

class Login(db.Model, SerializerMixin):
    __tablename__ = 'login'

    serialize_rules = ("-companies.login", "-open_positions.login", "-contacts.login")

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable = False)
    password_hash = db.Column(db.String, nullable = False)

    companies = db.relationship("Companies", back_populates="login")
    open_positions = db.relationship("Open_Positions", back_populates="login")
    contacts = db.relationship("Contact", back_populates="login")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @validates('password')
    def validate_password(self, key, val):
        if len(val) < 8:
            raise ValueError
        else:
            return val

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime

db = SQLAlchemy()

class Companies(db.Model, SerializerMixin):
    __tablename__ = "companies"

    serialize_rules = ("-open_positions.companies", )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    amount_of_employees = db.Column(db.String)
    total_open_positions = db.Column(db.Integer)

    open_positions = db.relationship("Open_Positions", back_populates = "companies", cascade = "all,delete")

class Open_Positions(db.Model, SerializerMixin):
    __tablename__ = "open_positions"

    serialize_rules = ("-companies.open_positions", "-contacts.open_positions")

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"))
    contact_id = db.Column(db.Integer, db.ForeignKey("contact.id"))
    position = db.Column(db.String)
    salary_range = db.Column(db.String)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    position_status = db.Column(db.Boolean)

    companies = db.relationship("Companies", back_populates = "open_positions")
    contacts = db.relationship("Contact", back_populates = "open_positions")

class Contact(db.Model, SerializerMixin):
    __tablename__ = "contact"

    serialize_rules = ("-open_positions.contacts", "-outreach.contacts")

    id = db.Column(db.Integer, primary_key=True)
    outreach_id = db.Column(db.Integer, db.ForeignKey("outreach.id"))
    name = db.Column(db.String)
    linkedin_url = db.Column(db.String)
    position = db.Column(db.String)
    length_of_position = db.Column(db.String)

    open_positions = db.relationship("Open_Positions", back_populates = "contacts")
    outreach = db.relationship("Outreach", back_populates = "contacts")

class Outreach(db.Model, SerializerMixin):
    __tablename__ = "outreach"

    serialize_rules = ("-contacts.outreach", )

    id = db.Column(db.Integer, primary_key=True)
    connected = db.Column(db.Boolean)
    sent_messages = db.Column(db.Integer)
    replied = db.Column(db.Boolean)
    tone = db.Column(db.Boolean)
    recent_interaction = db.Column(db.DateTime, default=datetime.utcnow)

    contacts = db.relationship("Contact", back_populates = "outreach")


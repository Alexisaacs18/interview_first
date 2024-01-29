from config import app

from models import db, datetime, Companies, Open_Positions, Contact, Outreach

if __name__ == '__main__':
    with app.app_context():

        print("deleting tables...")

        Companies.query.delete()
        Open_Positions.query.delete()
        Contact.query.delete()
        Outreach.query.delete()

        db.session.commit()

        print("creating companies...")

        companies = [
            Companies(
                name="Google",
                amount_of_employees="10k+",
                total_open_positions=3
            ),
            Companies(
                name="AWS",
                amount_of_employees="10k+",
                total_open_positions=3
            ),
            Companies(
                name="Meta",
                amount_of_employees="10k+",
                total_open_positions=2
            )
        ]

        db.session.add_all(companies)
        db.session.commit()

        open_Positions = [
            Open_Positions(
                company_id=companies[0].id,
                contact_id=1,
                position="Technical Support Engineer",
                salary_range="$70k - $90k",
                date_posted=datetime(2024, 1, 11, 16, 00),
                position_status=True
            ),
            Open_Positions(
                company_id=companies[0].id,
                contact_id=1,
                position="Software Engineer 1",
                salary_range="$80k - $100k",
                date_posted=datetime(2024, 1, 15, 13, 15),
                position_status=True
            ),
            Open_Positions(
                company_id=companies[0].id,
                contact_id=1,
                position="Front End Engineer",
                salary_range="$60k - $80k",
                date_posted=datetime(2024, 1, 15, 12, 30),
                position_status=True
            )
        ]

        db.session.add_all(open_Positions)
        db.session.commit()
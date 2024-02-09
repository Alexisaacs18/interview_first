from config import app

from models import db, Companies, Open_Positions, Contact, Login

if __name__ == '__main__':
    with app.app_context():

        print("deleting tables...")

        Companies.query.delete()
        Open_Positions.query.delete()
        Contact.query.delete()
        Login.query.delete()

        db.session.commit()

        print("creating companies...")

        login = [
            Login(
                email = 'alexisaacs18@gmail.com',
                password_hash = '12345678'
            ),
            Login(
                email = 'example@yahoo.com',
                password_hash = "abcdefgh"
            )
        ]

        db.session.add_all(login)
        db.session.commit()

        companies = [
            Companies(
                login_id=login[0].id,
                name="Google",
                amount_of_employees="10k+",
                total_open_positions=3
            ),
            Companies(
                login_id=login[0].id,
                name="AWS",
                amount_of_employees="10k+",
                total_open_positions=3
            ),
            Companies(
                login_id=login[0].id,
                name="Meta",
                amount_of_employees="10k+",
                total_open_positions=2
            )
        ]

        db.session.add_all(companies)
        db.session.commit()

        contacts = [
            Contact(
                login_id=login[0].id,
                name = "Robert Horvick",
                linkedin_url = "https://www.linkedin.com/in/roberthorvick/",
                position = "Engineering Manager at Google",
                length_of_position = "10 Months",
                connected = True,
                sent_messages = 1,
                replied = False,
                tone = False
            ),
            Contact(
                login_id=login[0].id,
                name = "Patrick Delfert",
                linkedin_url = "https://www.linkedin.com/in/delfert/",
                position = "Engineering Manager at Google",
                length_of_position = "1 Year 9 Months",
                connected = True,
                sent_messages = 3,
                replied = True,
                tone = True
            )
        ]

        db.session.add_all(contacts)
        db.session.commit()

        open_Positions = [
            Open_Positions(
                login_id=login[0].id,
                company_id=companies[0].id,
                contact_id=contacts[0].id,
                position="Technical Support Engineer",
                salary_range="$70k - $90k",
                position_status=True
            ),
            Open_Positions(
                login_id=login[0].id,
                company_id=companies[0].id,
                contact_id=contacts[1].id,
                position="Software Engineer 1",
                salary_range="$80k - $100k",
                position_status=True
            ),
            Open_Positions(
                login_id=login[0].id,
                company_id=companies[0].id,
                contact_id=contacts[0].id,
                position="Front End Engineer",
                salary_range="$60k - $80k",
                position_status=False
            )
        ]

        db.session.add_all(open_Positions)
        db.session.commit()
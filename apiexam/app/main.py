import os
from dotenv import load_dotenv
from fastapi import FastAPI
from faker import Faker
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DB_USER='user'
DB_PASSWORD='userpwd'
DB_HOST='mysql'
DB_NAME='testexam'
DB_PORT='3306'

app = FastAPI()

fake = Faker()

database_user_uri = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(database_user_uri)

Base = declarative_base()

class Registro(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    name = Column(String)
    email = Column(String)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

@app.get("/insertar_registros_falsos")
async def insertar_registros_falsos():
    num_registros = 10

    for _ in range(num_registros):
        registro = Registro(
            name=fake.name(),
            email=fake.email(),
        )
        session.add(registro)

    session.commit()

    return {"message": "Registros insertados correctamente."}



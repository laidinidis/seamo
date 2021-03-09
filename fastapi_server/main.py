from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/students/", response_model=List[schemas.Student])
def read_students(db: Session = Depends(get_db)):
    students = crud.get_students(db)
    return students


@app.post("/api/students/", response_model=schemas.Student)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = crud.get_student_by_name(db, name=student.name)
    if db_student:
        raise HTTPException(status_code=400, detail="Student already exists")
    return crud.create_student(db=db, student=student)


@app.post("/api/students/delete/{id}", response_model=int)
def delete_student(id: int, db: Session = Depends(get_db)):
    return crud.delete_student(db, id=id)


@app.get("/api/subjects/", response_model=List[schemas.Subjects])
def read_subjects(db: Session = Depends(get_db)):
    subjects = crud.get_subjects(db)
    return subjects


@app.get("/api/grades/", response_model=List[schemas.Grades])
def read_grades(db: Session = Depends(get_db)):
    grades = crud.get_grades(db)
    return grades


@app.post("/api/grades/", response_model=schemas.Grades)
def create_grade(grade: schemas.GradesCreate, db: Session = Depends(get_db)):
    return crud.create_grade(db=db, grade=grade)

from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "*"
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


def sort_by_key(s):
    return s["key"]


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


@app.get("/api/statistics/student/{student_id}/", response_model=List[schemas.Statistics])
def read_student_stats(student_id: int, db: Session = Depends(get_db)):
    grades = crud.get_student_stats(db, student_id=student_id)

    sums = {}
    for g in grades:
        key = str(g.year) + "_" + str(g.quarter)
        value = sums.get(key)
        if(value):
            sums[key] = {
                "sum": value["sum"] + g.grade,
                "count": value["count"] + 1,
                "label": value["label"]
            }
        else:
            sums[key] = {
                "sum": g.grade,
                "count": 1,
                "label": str(g.year) + " - Q" + str(g.quarter)
            }
    stats = []
    for key in sums:
        stats.append({
            "key": key,
            "label": sums[key]["label"],
            "avg": round(sums[key]["sum"] / sums[key]["count"], 1)
        })

    stats.sort(key=sort_by_key)

    return stats


@app.get("/api/statistics/subject/{subject_id}/", response_model=List[schemas.Statistics])
def read_subject_stats(subject_id: int, db: Session = Depends(get_db)):
    grades = crud.get_subject_stats(db, subject_id=subject_id)

    sums = {}
    for g in grades:
        key = str(g.year) + "_" + str(g.quarter)
        value = sums.get(key)
        if(value):
            sums[key] = {
                "sum": value["sum"] + g.grade,
                "count": value["count"] + 1,
                "label": value["label"]
            }
        else:
            sums[key] = {
                "sum": g.grade,
                "count": 1,
                "label": str(g.year) + " - Q" + str(g.quarter)
            }
    stats = []
    for key in sums:
        stats.append({
            "key": key,
            "label": sums[key]["label"],
            "avg": round(sums[key]["sum"] / sums[key]["count"], 1)
        })

    stats.sort(key=sort_by_key)

    return stats


@app.get("/api/statistics/period/", response_model=List[schemas.Statistics])
def read_subject_stats(year: int, quarter: int, db: Session = Depends(get_db)):
    grades = crud.get_period_stats(db, year=year, quarter=quarter)

    sums = {}
    for g in grades:
        key = str(g.subjectId)
        value = sums.get(key)
        if(value):
            sums[key] = {
                "sum": value["sum"] + g.grade,
                "count": value["count"] + 1,
                "label": value["label"]
            }
        else:
            sums[key] = {
                "sum": g.grade,
                "count": 1,
                "label": g.subject.name
            }
    stats = []
    for key in sums:
        stats.append({
            "key": key,
            "label": sums[key]["label"],
            "avg": round(sums[key]["sum"] / sums[key]["count"], 1)
        })

    stats.sort(key=sort_by_key)

    return stats

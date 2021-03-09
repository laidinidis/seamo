from sqlalchemy.orm import Session

from . import models, schemas


def get_student_by_name(db: Session, name: str):
    return db.query(models.Students).filter(models.Students.name == name).first()


def get_students(db: Session):
    return db.query(models.Students).filter(models.Students.deleted == False).all()


def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Students(
        name=student.name, birthdate=student.birthdate)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def delete_student(db: Session, id: int):
    deleted = db.query(models.Students).filter(
        models.Students.id == id).update({models.Students.deleted: True})
    db.commit()
    return deleted


def get_subjects(db: Session):
    return db.query(models.Subjects).all()


def get_grades(db: Session):
    return db.query(models.Grades).all()


def create_grade(db: Session, grade: schemas.GradesCreate):
    db_grade = models.Grades(
        year=grade.year, quarter=grade.quarter, grade=grade.grade, studentId=grade.studentId, subjectId=grade.subjectId)
    db.add(db_grade)
    db.commit()
    db.refresh(db_grade)
    return db_grade

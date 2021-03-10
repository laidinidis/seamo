from datetime import datetime
from pydantic import BaseModel


class StudentBase(BaseModel):
    name: str
    birthdate: datetime


class StudentCreate(StudentBase):
    pass


class Student(StudentBase):
    id: int
    deleted: bool

    class Config:
        orm_mode = True


class SubjectsBase(BaseModel):
    name: str


class SubjectsCreate(SubjectsBase):
    pass


class Subjects(SubjectsBase):
    id: int

    class Config:
        orm_mode = True


class GradesBase(BaseModel):
    year: int
    quarter: int
    grade: int


class GradesCreate(GradesBase):
    studentId: int
    subjectId: int


class Grades(GradesBase):
    id: int
    student: Student
    subject: Subjects

    class Config:
        orm_mode = True


class Statistics(BaseModel):
    key: str
    label: str
    avg: float

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


class ClassesBase(BaseModel):
    name: str


class ClassesCreate(ClassesBase):
    pass


class Classes(ClassesBase):
    id: int

    class Config:
        orm_mode = True


class GradesBase(BaseModel):
    year: int
    quarter: int
    grade: int


class GradesCreate(GradesBase):
    pass


class Grades(GradesBase):
    id: int
    studentId: int
    classId: int

    class Config:
        orm_mode = True

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Students(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    birthdate = Column(DateTime)
    deleted = Column(Boolean, default=False)


class Subjects(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)


class Grades(Base):
    __tablename__ = "grades"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    quarter = Column(Integer)
    grade = Column(Integer)
    studentId = Column(Integer, ForeignKey("students.id"))
    subjectId = Column(Integer, ForeignKey("subjects.id"))

    student = relationship("Students", lazy='joined')
    subject = relationship("Subjects", lazy='joined')

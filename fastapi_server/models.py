from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Students(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    birthdate = Column(DateTime)
    deleted = Column(Boolean, default=False)

    # grades = relationship("Grades", back_populates="student")


class Classes(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    # grades = relationship("Grades", back_populates="subject")


class Grades(Base):
    __tablename__ = "grades"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    quarter = Column(Integer)
    grade = Column(Integer)
    studentId = Column(Integer, ForeignKey("students.id"))
    classId = Column(Integer, ForeignKey("classes.id"))

    # student = relationship("Students", back_populates="owner")
    # subject = relationship("Classes", back_populates="owner")
    student = relationship("Students")
    subject = relationship("Classes")

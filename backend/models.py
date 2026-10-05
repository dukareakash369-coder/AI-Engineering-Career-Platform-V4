from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.sql import func

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class CareerProfile(Base):
    __tablename__ = "career_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    # Education
    college = Column(String(200), nullable=True)
    university = Column(String(200), nullable=True)
    city = Column(String(100), nullable=True)
    engineering_year = Column(String(50), nullable=True)
    engineering_branch = Column(String(100), nullable=True)

    # Interests
    engineering_interests = Column(Text, nullable=True)
    what_excites_you = Column(Text, nullable=True)

    # Technical Profile
    technical_skills = Column(Text, nullable=True)
    projects = Column(Text, nullable=True)
    experience = Column(Text, nullable=True)

    # Career Direction
    target_role = Column(String(200), nullable=True)
    career_expectations = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
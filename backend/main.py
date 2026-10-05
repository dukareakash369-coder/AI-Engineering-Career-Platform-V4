from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from database import get_db, Base, engine
from models import User, CareerProfile

app = FastAPI(
    title="CareerAI API",
    description="Backend API for CareerAI",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create database tables
Base.metadata.create_all(bind=engine)


# Password hashing
password_hasher = PasswordHash.recommended()


class SignupRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ProfileRequest(BaseModel):
    user_id: int

    college: str | None = None
    university: str | None = None
    city: str | None = None
    engineering_year: str | None = None
    engineering_branch: str | None = None

    engineering_interests: str | None = None
    what_excites_you: str | None = None

    technical_skills: str | None = None
    projects: str | None = None
    experience: str | None = None

    target_role: str | None = None
    career_expectations: str | None = None


@app.get("/")
def root():
    return {
        "message": "CareerAI backend is running",
        "status": "online",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CareerAI API",
    }


@app.post("/auth/signup")
def signup(
    user_data: SignupRequest,
    db: Session = Depends(get_db),
):
    # Check whether email already exists
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    # Secure password hashing
    password_hash = password_hasher.hash(user_data.password)

    # Create new user
    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        password_hash=password_hash,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Account created successfully",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
        },
    }


@app.post("/profile")
def save_profile(
    profile_data: ProfileRequest,
    db: Session = Depends(get_db),
):
    # Check whether user exists
    user = (
        db.query(User)
        .filter(User.id == profile_data.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    # Check whether profile already exists
    existing_profile = (
        db.query(CareerProfile)
        .filter(
            CareerProfile.user_id == profile_data.user_id
        )
        .first()
    )

    if existing_profile:
        profile = existing_profile

        profile.college = profile_data.college
        profile.university = profile_data.university
        profile.city = profile_data.city
        profile.engineering_year = profile_data.engineering_year
        profile.engineering_branch = profile_data.engineering_branch

        profile.engineering_interests = (
            profile_data.engineering_interests
        )
        profile.what_excites_you = (
            profile_data.what_excites_you
        )

        profile.technical_skills = (
            profile_data.technical_skills
        )
        profile.projects = profile_data.projects
        profile.experience = profile_data.experience

        profile.target_role = profile_data.target_role
        profile.career_expectations = (
            profile_data.career_expectations
        )

    else:
        profile = CareerProfile(
            user_id=profile_data.user_id,

            college=profile_data.college,
            university=profile_data.university,
            city=profile_data.city,
            engineering_year=profile_data.engineering_year,
            engineering_branch=profile_data.engineering_branch,

            engineering_interests=(
                profile_data.engineering_interests
            ),
            what_excites_you=(
                profile_data.what_excites_you
            ),

            technical_skills=(
                profile_data.technical_skills
            ),
            projects=profile_data.projects,
            experience=profile_data.experience,

            target_role=profile_data.target_role,
            career_expectations=(
                profile_data.career_expectations
            ),
        )

        db.add(profile)

    db.commit()
    db.refresh(profile)

    return {
        "message": "Career profile saved successfully",
        "profile": {
            "id": profile.id,
            "user_id": profile.user_id,
        },
    }
@app.post("/auth/login")
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == login_data.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    password_valid = password_hasher.verify(
        login_data.password,
        user.password_hash,
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
        },
    }
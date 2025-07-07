# STUDENT_EXTRACURRICULAR_ACHIEVEMENTS_PLATFORM

_**Empowering Students, Celebrating Achievements, Inspiring Futures**_

![last-commit](https://img.shields.io/github/last-commit/RamaTeja99/Student_Extracurricular_Achievements_Platform?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/RamaTeja99/Student_Extracurricular_Achievements_Platform?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/RamaTeja99/Student_Extracurricular_Achievements_Platform?style=flat&color=0080ff)

### 🛠 Built with:

![Spring](https://img.shields.io/badge/Spring-000000.svg?style=flat&logo=Spring&logoColor=white)    ![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black)   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" height="19" style="vertical-align:middle; background-color:#000;"/>![Java](https://img.shields.io/badge/Java-000000.svg?style=flat&logoColor=white)      ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black)    ![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=flat&logo=mysql&logoColor=white) 

![Maven](https://img.shields.io/badge/Maven-C71A36.svg?style=flat&logo=apache-maven&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white)
![XML](https://img.shields.io/badge/XML-005FAD.svg?style=flat&logo=XML&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## 📝 Overview

The **Student Extracurricular Achievements Platform** (SEAP) is a web application that allows educational institutions to manage, verify, and showcase students' extracurricular activities and achievements. It enables students to submit certificates, track participation, and build a verified co-curricular profile.

This platform bridges the gap between academics and co-curricular development by:
- Allowing students to log their achievements.
- Providing admins/faculty with tools for verification.
- Generating digital portfolios for students.

---

## ✨ Features

- 👤 Student registration and login.
- 📤 Upload and manage extracurricular certificates.
- 📊 Admin dashboard for verifying student activities.
- 🧾 Certificate validation with status (Pending, Approved, Rejected).
- 📅 Timeline view of student achievements.
- 📜 Downloadable co-curricular resume/portfolio.
- 🔐 Role-based access control (Admin & Student).
- 🔎 Search and filter by activity type, year, or domain.

---

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have the following installed:

- **Java (11 or above)**
- **Node.js & npm**
- **Maven**
- **MySQL/PostgreSQL** (or any compatible DB)

---

### 📦 Installation

Clone the project and install dependencies.

```bash
# Clone the repository
git clone https://github.com/RamaTeja99/Student_Extracurricular_Achievements_Platform

# Navigate to project folder
cd Student_Extracurricular_Achievements_Platform


# ⚙️ Install Frontend and Backend Dependencies

# Frontend (React + npm)
cd frontend
npm install

# Backend (Spring Boot + Maven)
cd backend
mvn install
```
## ▶️ Usage
```bash
#Start the Frontend
cd frontend
npm start

#Start the Backend
cd backend
mvn spring-boot:run

Note:
-> Ensure your database is running and you have added application.properties in src/main/resources
-> Also ensure your environment variables (like DB credentials) are properly configured.
```
## Project Structure
```bash
Student_Extracurricular_Achievements_Platform/
├── frontend/               # Frontend React App
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/                # Backend Spring Boot App
│   ├── src/
│   ├── pom.xml
├── README.md
```
## Screenshots

### 📌 Home Page
![image](https://github.com/user-attachments/assets/7bb5641d-2f99-4426-83c8-2005021bd140)

![image](https://github.com/user-attachments/assets/70ae6ce8-d971-4ea2-8c38-4a7f339f44e7)


### 📌 Student Dashboard
![image](https://github.com/user-attachments/assets/d64ffcad-ff06-4c7b-b7f0-1732a45bfb96)
![image](https://github.com/user-attachments/assets/9b5648d0-053b-4619-bb3e-b9fb1d21ca9f)

![image](https://github.com/user-attachments/assets/ea194a90-b961-48fd-9aeb-10ee804f9ca6)
![image](https://github.com/user-attachments/assets/12c213c2-3676-4448-b1b0-3083966d6ce6)



### 📌 College Panel 
![image](https://github.com/user-attachments/assets/56254327-0672-423a-af16-235e2d19c438)
![image](https://github.com/user-attachments/assets/8ca6fcf9-2b63-4fd4-bd40-8620aef8aa00)

![image](https://github.com/user-attachments/assets/77de741a-3519-43ba-bfab-28e007599586)
![image](https://github.com/user-attachments/assets/6512c160-76fc-40db-97a1-5212c2884499)


### 📌 Admin Panel
![image](https://github.com/user-attachments/assets/d2bd176f-f519-4dcf-b2d0-f0ac5e75fe82)
![image](https://github.com/user-attachments/assets/e149431e-9bb2-4391-8aee-e5c53bf850ff)

![image](https://github.com/user-attachments/assets/96f958e8-555c-4cf1-b5ad-55641ba59389)
![image](https://github.com/user-attachments/assets/6b5971ee-f262-4a40-bf1d-da253d07a437)








## Contributing

### Contributions are welcome!
``` bash
# Fork the repository.
gh repo fork owner/repo
Ex: gh repo fork octocat/hello-world

# Create your feature branch:
git checkout -b feature/your-feature-name
Ex: git checkout -b feature/update-readme

# Commit your changes:
git commit -am 'Add your message here'

# Push to the branch:
git push origin feature/your-feature-name
Ex: git push origin feature/update-readme

# Submit a pull request.
gh pr create --base main --head your-username:feature/your-feature-name --title "Add Feature" --body "Detailed PR description"

```


#  AI Talent Screening Platform – Frontend

<p align="center">
  <b>AI-powered recruiter dashboard for faster, smarter, and fairer hiring</b>
</p>

<p align="center">
  <a href="https://ai-talent-screening.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-View_App-0A66C2?style=for-the-badge&logo=vercel" />
  </a>
  <img src="https://img.shields.io/badge/Hackathon-Umurava_AI-orange?style=for-the-badge" />
</p>

##  Problem

Recruiters today face:

- Overwhelming number of applications  
-  Difficulty comparing candidates fairly  
-  Long time-to-hire  
##  Solution

This frontend delivers a **clean, intelligent interface** that enables recruiters to:

- Upload and manage applicants  
- Trigger AI-powered screening  
- Instantly view ranked candidates  
- Understand *why* each candidate is selected  

>  AI assists decision-making — humans remain in control.
##  Live Demo

 https://ai-talent-screening.vercel.app  

##  Core Features

###  Recruiter Dashboard
- Central hub for managing jobs and applicants  
- Designed for clarity and speed  

###  Job Creation
- Define role requirements, skills, and experience  
- Simple and reusable workflows  

###  Applicant Ingestion
- Upload CSV / Excel files  
- Upload resume PDFs  
- Structured profile support  
- Real-time validation  

###  AI Screening Trigger
- One-click screening  
- Seamless API integration  

###  Ranked Shortlist
- Top 10 / Top 20 candidates  
- Sorted by match score  

###  Explainable AI Output
Each candidate includes:
- Match Score (0–100)  
- Strengths  
- Gaps / Risks  
- Final Recommendation  

##  User Flow
### Create Job → Upload Applicants → Trigger AI → View Ranked Candidates

##  UI Preview

> Add screenshots here (this is critical for recruiter impact)

Recommended:
- Dashboard view  
- Candidate ranking table  
- AI explanation cards  
- Upload interface  

##  Tech Stack

| Layer        | Technology |
|-------------|----------|
| Framework    | Next.js |
| Language     | TypeScript |
| State Mgmt   | Redux Toolkit |
| Styling      | Tailwind CSS |
| API Layer    | REST APIs |



##  Project Structure

```
src/
├── components/  Reusable UI components
├── features/ Redux slices (state logic)
├── app/  Routing
├── services/  API communication
├── hooks/  Custom hooks
├── utils/  Helper functions
└── styles/ Global styles
```

##  Getting Started

### 1. Clone repository

```bash
git clone https://github.com/Lapidis2/umurava_hackaton_recruiter_site.git
cd umurava_hackaton_recruiter_site
```

### 2. Install dependencies

```
npm install
```
### 3.Run development server
  ```npm run dev
  ```

## Challenge and how to solve
```
| Challenge              | Solution                  |
| ---------------------- | ------------------------- |
| Large applicant data   | Pagination + lazy loading |
| AI explanation clarity | Structured UI cards       |
| File upload complexity | Unified ingestion flow    |
| AI latency             | Loading + feedback system |
```
##
MIT License
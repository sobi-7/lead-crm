# Profitcast CRM — Lead Management System

A lightweight CRM application built for Profitcast's sales team to efficiently manage leads, track sales pipeline progress, and organize customer information. The application replaces manual spreadsheet-based lead tracking with a structured and user-friendly workflow.

## Live Demo

🔗 https://lead-crm-lemon.vercel.app

## GitHub Repository

🔗 https://github.com/sobi-7/lead-crm.git

---

## Features

### Lead Management

* View all leads in a centralized dashboard
* Add new leads using a simple lead creation form
* Edit and update existing lead information
* Store lead details including business name, service, city, budget, owner, notes, and follow-up date

### Pipeline Tracking

* Track leads across multiple sales stages:

  * New
  * Contacted
  * Proposal Sent
  * Negotiation
  * Closed Won
  * Closed Lost
* Visual stage indicators for quick status recognition
* Pipeline summary cards displaying lead counts by stage

### Filtering & Organization

* Filter leads by pipeline stage
* Track lead priority levels
* Track lead source channels
* View lead ownership and latest updates

### Data Persistence

* Browser-based storage using Local Storage
* Data remains available after page refresh
* No backend setup required

---

## Tech Stack

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Local Storage
* Lucide React Icons

---

## Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx          # Dark navy nav sidebar
│   ├── LeadTable.jsx        # Main leads table
│   ├── LeadDetailModal.jsx  # View + edit modal
│   ├── LeadForm.jsx         # Add / edit lead form
│   ├── StageFilter.jsx      # Tab filter by pipeline stage
│   └── PipelineSummary.jsx  # Stat row + stage breakdown
├── pages/
│   ├── Dashboard.jsx        # Overview page
│   ├── LeadsPage.jsx        # Main leads view
│   └── AddLeadPage.jsx      # Add new lead page
├── hooks/
│   └── useLeads.js          # All localStorage read/write logic
├── data/
│   ├── dummyLeads.js        # 10 pre-loaded leads for testing
│   └── constants.js         # Stages, services, owners, etc.
├── App.jsx
└── main.jsx
```

## Installation

```bash
git clone <repository-url>
cd crm-task
npm install
npm run dev
```

Application will run on:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## AI Tool Usage

AI-assisted development tools were used for project planning, component design guidance, debugging support, and code review. All implementation decisions, testing, validation, and final code integration were reviewed manually before submission.

---

## Future Improvements

Given additional development time, I would:

* Add backend integration and database persistence
* Implement authentication and role-based access control
* Add advanced search and sorting functionality
* Introduce activity history tracking for leads
* Create analytics and reporting dashboards
* Support team collaboration features

---

## Reflection

This project focused on building a practical CRM workflow with emphasis on usability, maintainability, and sales pipeline visibility. The biggest challenge was designing a simple interface while ensuring lead information remained easy to manage and update. If given additional time, I would prioritize backend integration and collaboration features to make the application production-ready.

---

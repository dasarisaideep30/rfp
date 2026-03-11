# RFP Command Center - Comprehensive Functionality Map

This document outlines every feature and functionality implemented in the RFP Command Center project. This includes core pages, backend logic, automated engines, and minor utility features.

## 1. Authentication & Identity Management
*   **User Registration**:
    *   Fields: First Name, Last Name, Work Email, Password.
    *   Automatic role assignment (defaults to `SOLUTION_ARCHITECT`).
    *   Password hashing (Backend security).
*   **User Login**:
    *   JWT-based authentication (Token stored in `localStorage`).
    *   "Remember Me" logic (Implicit via token persistence).
*   **Session Management**:
    *   Automatic login on app refresh (via `/auth/me` endpoint).
    *   Secure logout (clears tokens and state).
*   **User Profile**:
    *   Persistent user context across the app.
    *   Initial-based avatars (e.g., "JS" for John Smith).
    *   Role-based interface adaptation (UI elements show/hide based on `UserRole`).

## 2. Core Feature: RFP Management
*   **RFP Pipeline (List View)**:
    *   Tabular display of all active proposals.
    *   Columns: Title, Client, Deal Value, Deadline, Status, Risk Level, Owner.
    *   Search: Real-time filtering by Client Name, RFP Number, or Project Title.
    *   Role-based Visibility: Solution Architects only see RFPs they are assigned to.
*   **RFP Creation**:
    *   Automated RFP Number Generation (Format: `RFP-YYYY-XXXX`).
    *   Required Fields: Client Name, Industry, Project Title, Deadline, Deal Value.
    *   Optional Field: Executive Summary.
    *   **Automation on Create**:
        1. Generates 5 chronological Milestones (Kickoff to Submission).
        2. Assigns initial Tasks (Review Requirements, Draft Architecture).
        3. Logs creation in Activity Feed.
        4. Sends notification to Solution Architect (if assigned).
*   **RFP Detailed View**:
    *   Executive Overview Card.
    *   Interactive Progress Bar (Dynamic completion percentage).
    *   Countdown Timer (Days remaining until deadline, color-coded for urgency).
    *   Milestone Timeline (Visual status indicators for each phase).
    *   Associated Tasks Table (With direct owner links).
*   **RFP Updates**:
    *   Update basic info, status, and assigned personnel.
    *   Risk & Completion re-calculation triggered on every update.

## 3. Governance: Task & Ownership
*   **Task CRUD**:
    *   Create, Update, Delete tasks within an RFP.
    *   Task Fields: Title, Description, Due Date, Status (NOT_STARTED, IN_PROGRESS, BLOCKED, COMPLETED).
*   **Aggregated Workload (My Tasks View)**:
    *   A dedicated page showing all tasks assigned to the current user across ALL RFPs.
    *   Filtering by status (All, Pending, Completed).
    *   Optimistic UI Checkbox: Instantly toggles status on frontend while syncing to backend.
*   **Task Automation**:
    *   **Overdue Tracking**: Automatically flags tasks if `now > dueDate`.
    *   **Escalation Logic**: Specifically flags tasks as "Escalated" if overdue by more than 48 hours.
    *   **Completion Records**: Stores `completedAt` timestamp upon completion for lead-time analysis.

## 4. Analytics & Executive Dashboard
*   **KPI Tracking (Real-time)**:
    *   **Total Pipeline Value**: Sum of all active RFP deal values.
    *   **Active RFP Count**: Total number of ongoing proposals.
    *   **At Risk RFPs**: Count of proposals flagged as 'RED' risk.
    *   **Average Turnaround Time**: Calculates average days from RFP creation to submission.
    *   **SLA Compliance Rate**: Tracks the percentage of tasks completed before their deadline.
    *   **Industry Breakdown**: Aggregated pipeline value and RFP count categorized by industry sectors.
*   **Visualizations**:
    *   **Status Distribution**: Bar chart showing volume across the pipeline stages (Intake, Planning, Review, etc.).
    *   **Risk Distribution**: Percentage-based bars for Green, Amber, Red states.
*   **Recent Activity Feed**:
    *   Chronological audit trail of all major actions in the system.
    *   Displays User, Action, RFP Name, and relative Time (e.g., "Sarah updated Cloud RFP 2 hours ago").
*   **Global Unread Notifications**:
    *   Badge on Topbar showing pending alerts.

## 5. Automated Intelligence Engines
*   **Risk Calculation Engine**:
    *   Uses a point-based scoring system (0-100) to determine Risk Level (GREEN < 25, AMBER < 50, RED >= 50).
    *   **Scoring Factors**:
        1. Deadline proximity (urgency increase as deadline nears).
        2. Percentage of incomplete tasks.
        3. Number of overdue milestones.
        4. Lack of assigned Solution Architect (Resource risk).
*   **Completion Percentage Engine**:
    *   Weighted calculation: 70% weight to Task completion, 30% weight to Milestone completion.
*   **Timeline Planner**:
    *   Automatically schedules:
        *   Kickoff (T+1 day).
        *   1st Draft (40% mark of total duration).
        *   Internal Review (7 days before deadline).
        *   Final Approval (2 days before deadline).

## 6. System & Infrastructure Features
*   **Audit Compliance**:
    *   Every entity (RFP, Task, Approval) has an associated `ActivityLog`.
    *   Enums strictly control valid states (No "magic strings").
*   **Notification System**:
    *   Context-aware alerts for: Task Assignments, Approaching Deadlines, Risk Escalations, Status Changes.
*   **Demo Mode (Mock API)**:
    *   A full frontend-only fallback system that allows the app to function without a backend.
    *   Uses `localStorage` and `import.meta.env.VITE_USE_MOCK`.
*   **API Resilience**:
    *   Exponential backoff/retry logic for failed network calls.
    *   Rate-limiting (429) handling.

## 7. Role-Based Access Control (RBAC)
| Role | Permissions |
| :--- | :--- |
| **Proposal Manager** | Full Access (Create, Edit, Delete RFPs, Admin Dashboard). |
| **Solution Architect** | Create RFPs, Update assigned RFPs, Manage personal tasks. |
| **Bid Reviewer** | View-only RFPs, Specific Approval/Reject permissions. |
| **Leadership** | Global Read-Only access (Executive Dashboard focus). |

## 8. Minor User Experience (UX) Features
*   **Visual Badges**: Color-coded badges for Status (Blue/Purple), Risk (Green/Gold/Red), and Priority.
*   **System Status Indicator**: Low-profile health check in the sidebar.
*   **Table Hover Effects**: Highlighting rows for better navigation.
*   **Dropdown Menu Management**: User profile menu for settings and logout.
*   **Empty State Management**: Dedicated UI for empty lists (No RFPs, No Tasks).
*   **Loading State Management**: Centralized spinner system for async operations.

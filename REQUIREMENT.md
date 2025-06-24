# Project: Account-Specific Learning Management System (LMS) - Frontend Development with Angular

## Overall Goal:
Develop a full-fledged, end-to-end web application frontend for an Account-Specific Learning Management System. This system will track employee skill sets, identify skill gaps, recommend trainings, and facilitate learning path management for both Admins and Developers.

## Development Environment:
- **IDE:** VS Code
- **AI Tool:** GitHub Copilot Agent
- **Frontend Framework:** Angular (latest stable version)
- **Styling Framework:** Tailwind CSS
- **UI Component Library:** Angular Material
- **Authentication:** Mock SSO for frontend demonstration. Backend integration will be separate.
- **Data:** Use mock/dummy data for all frontend components initially.

## Detailed Development Plan for GitHub Copilot Agent:







### **General Instructions for Copilot Agent:**

1.  **Code Quality:** Ensure clean, well-structured, and idiomatic Angular code. Follow Angular best practices for components, services, and modules.
2.  **Comments:** Add comments to explain complex logic, component purpose, and the use of mock data.
3.  **Error Handling (Frontend):** For form submissions and other interactive elements, use Angular Material's error display mechanisms or simple `alert()` for this demo, but include comments indicating that custom modal UI should be used in production instead of `alert()`.
4.  **Responsiveness:** Use Tailwind CSS utility classes extensively for responsive design (`sm:`, `md:`, `lg:` prefixes) to ensure the layout adapts well to different screen sizes.
5.  **Dummy Data:** All data displayed should be mock/dummy data hardcoded in the components for initial frontend development.
6.  **Import Modules:** Ensure all necessary Angular Material modules (like `MatCardModule`, `MatInputModule`, `MatButtonModule`, `MatFormFieldModule`, `MatProgressSpinnerModule`, `MatTableModule`, `MatMenuModule`, `MatIconModule`, `MatTooltipModule`, etc.) and `ReactiveFormsModule` are correctly imported into `src/app/app.module.ts`. Use `MatIconModule` for the icons shown in the dashboard.
7.  **CSS Animations:** For subtle UI enhancements, consider adding simple CSS animations (e.g., `animate-fade-in`, `animate-bounce-in` for titles, which you might define in `styles.scss` or `tailwind.config.js` if Tailwind doesn't have them built-in, or use `transition` classes directly for hover effects).

**After generating the code for each task, please provide instructions on how to continue to the next task or how to run the application (e.g., `npm install`, `ng serve`).**

Let's begin by following these instructions step by step.

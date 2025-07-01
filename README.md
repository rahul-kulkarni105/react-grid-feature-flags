# React Data Grid App with MUI DataGrid

This project i│   ├── components
│   │   ├── DataGrid.tsx              # Main container component
│   │   ├── DataGridTable.tsx         # Grid table with columns & actions
│   │   ├── DataGridToolbar.tsx       # Custom toolbar component  
│   │   ├── ConfirmationDialog.tsx    # Delete confirmation dialog
│   │   ├── EditModal.tsx             # Legacy modal component
│   │   └── Notification.tsx          # Snackbar notification componentact application built with TypeScript that displays a data grid with inline editing capabilities. It utilizes React Query for data fetching and state management, and MUI DataGrid for full-featured CRUD operations.

## Features

- **Full CRUD Operations**: Create, read, update, and delete data directly in the grid
- **Inline Editing**: Edit data directly in the grid using MUI DataGrid's built-in editing features
- **Row Management**: Add new rows with custom toolbar, edit existing rows with save/cancel actions
- **Delete Confirmation**: Warning dialog before deleting rows to prevent accidental data loss
- **Data Management**: TanStack Query v5 for efficient data fetching, caching, and mutations
- **Modern UI**: Material-UI components with React 19 for a polished user experience
- **TypeScript Support**: Full type safety throughout the application
- **Code Splitting**: Dynamic imports and optimized bundle size
- **Responsive Design**: Grid adapts to different screen sizes
- **Mock Data**: Built-in mock data service to eliminate CORS issues

## Technologies Used

- **React 19** - Latest UI Framework
- **TypeScript 5.8.3** - Type safety
- **Vite 6** - Modern build tool and dev server
- **TanStack Query v5** - Data fetching and caching (formerly React Query)
- **MUI DataGrid 7** - Advanced data grid with editing capabilities
- **Material-UI 6** - UI component library
- **Prettier** - Code formatting

## Key Components

- **DataGrid**: Main container component that orchestrates the data grid
- **DataGridTable**: Pure component that renders the MUI DataGrid with columns and actions
- **DataGridToolbar**: Custom toolbar component for adding new records
- **ConfirmationDialog**: Reusable dialog component for delete confirmations
- **Notification**: Reusable snackbar component for user feedback
- **useDataGrid**: Custom hook containing all data grid business logic and state management
- **useSnackbar**: Custom hook for managing notification state
- **Mock Data Service**: Centralized mock data with CRUD operations

## Architecture

The application follows a clean architecture pattern:

- **Presentation Layer**: React components focused on UI rendering
- **Business Logic Layer**: Custom hooks containing application logic
- **Data Layer**: API services and mock data management
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Hooks and components are designed for reuse

## Project Structure

```
react-grid-feature-flags
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── components
│   │   ├── DataGrid.tsx              # Main container component
│   │   ├── DataGridTable.tsx         # Grid table with columns & actions
│   │   ├── DataGridToolbar.tsx       # Custom toolbar component
│   │   ├── EditModal.tsx             # Legacy modal component
│   │   └── Notification.tsx          # Snackbar notification component
│   ├── hooks
│   │   ├── useDataApi.ts             # Legacy data API hook
│   │   ├── useDataGrid.ts            # Main data grid logic hook
│   │   └── useSnackbar.ts            # Notification management hook
│   ├── mocks
│   │   └── mockData.ts               # Mock feature flag data
│   ├── services
│   │   └── api.ts                    # API service functions
│   └── types
│       └── index.ts                  # TypeScript type definitions
├── .prettierrc.json
├── .prettierignore
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Setup Instructions

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd react-grid-feature-flags
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Run the application:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Format code:**

   ```bash
   npm run format
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- **View Data**: The application loads mock data automatically when it starts
- **Add New Rows**: Click the "Add Row" button in the custom toolbar to create new entries
- **Edit Rows**: Double-click on any cell or use the edit button in the actions column to enter edit mode
- **Save Changes**: Click the checkmark icon to save changes or the X icon to cancel
- **Delete Rows**: Use the delete button in the actions column - a confirmation dialog will appear to prevent accidental deletions
- **Data Persistence**: All changes are managed through TanStack Query with automatic cache updates

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

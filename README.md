# React Data Grid App with MUI DataGrid

This project is a React application built with TypeScript that displays a data grid with inline editing capabilities. It utilizes React Query for data fetching and state management, and MUI DataGrid for full-featured CRUD operations.

## Features

- **Full CRUD Operations**: Create, read, update, and delete data directly in the grid
- **Inline Editing**: Edit data directly in the grid using MUI DataGrid's built-in editing features
- **Row Management**: Add new rows with custom toolbar, edit existing rows with save/cancel actions
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

- **DataGridComponent**: Main grid component with inline editing
- **MUI DataGrid**: Provides row editing, pagination, sorting, and filtering
- **React Query**: Handles data fetching, caching, and mutations
- **Material-UI Theme**: Consistent styling and theming

## Project Structure

```
react-grid-feature-flags
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── components
│   │   ├── DataGrid.tsx
│   │   └── EditModal.tsx
│   ├── hooks
│   │   └── useDataApi.ts
│   ├── services
│   │   └── api.ts
│   └── types
│       └── index.ts
├── .prettierrc.json
├── .prettierignore
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
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
- **Delete Rows**: Use the delete button in the actions column to remove rows
- **Data Persistence**: All changes are managed through TanStack Query with automatic cache updates

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

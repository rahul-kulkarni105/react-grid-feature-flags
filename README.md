# React Data Grid App with MUI DataGrid

This project is a React application built with TypeScript that displays a data grid with inline editing capabilities. It utilizes React Query for data fetching and state management, and MUI DataGrid for full-featured CRUD operations.

## Features

- **Inline Editing**: Edit data directly in the grid using MUI DataGrid's built-in editing features
- **Row-based Editing**: Click on a row to enter edit mode, make changes, and save/cancel
- **Data Synchronization**: Sync data with the server to fetch the latest updates
- **Modern UI**: Material-UI components for a polished user experience
- **TypeScript Support**: Full type safety throughout the application
- **Responsive Design**: Grid adapts to different screen sizes

## Technologies Used

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite 5** - Build tool and dev server
- **React Query 3** - Data fetching and caching
- **MUI DataGrid** - Advanced data grid with editing capabilities
- **Material-UI** - UI component library
- **Axios** - HTTP client

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
├── public
│   └── index.html
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

   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- Load the data from the API when the application starts.
- Click on a row in the data grid to open the edit modal.
- Make changes to the row values and click "Save" to apply changes.
- Use the "Cancel" button to discard changes.
- Click the "Update" button in the grid to send all updated rows back to the server.
- Click the "Sync" button to fetch the latest data from the server.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

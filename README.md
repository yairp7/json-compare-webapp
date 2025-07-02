# JSON Compare Web App

A modern, responsive web application for comparing JSON objects with the ability to exclude specific fields from the comparison. Built with React, TypeScript, Vite, and Styled Components.

![JSON Compare Logo](public/logo.svg)

## ✨ Features

- **🔍 Real-time JSON Validation** - Instant feedback as you type with detailed error messages
- **📝 JSON Formatting** - Auto-format JSON with proper indentation
- **🏷️ Field Exclusion** - Exclude specific fields from comparison using a tag-based interface
- **🔍 Deep Comparison** - Performs deep object comparison with detailed difference reporting
- **🎨 Modern UI** - Clean, responsive design with smooth animations and visual feedback
- **⚡ Real-time Results** - Instant comparison results with clear visual indicators
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **🎯 Type Safety** - Full TypeScript support for robust development

## 🚀 Use Cases

Perfect for comparing:
- **API Response Differences** between environments
- **Test Results** with timestamps or dynamic values
- **Configuration Files** with environment-specific values
- **Data Migration** validation
- **Any JSON data** where certain fields should be ignored

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with strict type checking
- **Vite** - Fast build tool and development server
- **Styled Components** - CSS-in-JS styling with theme support
- **Jest** - Testing framework with TypeScript support
- **ESLint** - Code linting and formatting

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd json-compare-webapp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser and navigate to `http://localhost:5173`**

## 🎯 Usage

### 1. **Add Excluded Fields**
- Type field names in the "Excluded Fields" section
- Press Enter to create tags
- Click the × button to remove fields
- Supports nested field exclusion (e.g., `timestamp`, `lastLogin`)

### 2. **Paste JSON**
- Paste your first JSON object in the left textarea
- Paste your second JSON object in the right textarea
- Real-time validation provides instant feedback

### 3. **Format JSON (Optional)**
- Click the "Format" button to auto-format valid JSON
- Improves readability with proper indentation

### 4. **Compare**
- Click the "Compare JSON" button to see differences
- Button is disabled until both JSONs are valid

### 5. **Review Results**
The comparison results will show:
- ✅ **Equal** - Objects are equal (excluding specified fields)
- ❌ **Differences** - Detailed list of differences with path information
- 📍 **Error Details** - Specific line and column numbers for JSON errors

## 📋 Example

**JSON 1:**
```json
{
  "id": 1,
  "name": "John Doe",
  "timestamp": "2024-01-01T10:00:00Z",
  "score": 95
}
```

**JSON 2:**
```json
{
  "id": 1,
  "name": "John Doe",
  "timestamp": "2024-01-01T11:00:00Z",
  "score": 95
}
```

**Excluded Fields:** `timestamp`

**Result:** ✅ The JSON objects are equal (excluding specified fields)

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 🏗️ Project Structure

```
json-compare-webapp/
├── public/
│   ├── logo.svg              # Application logo
│   ├── favicon.svg           # Favicon
│   └── favicon-16x16.svg     # Small favicon
├── src/
│   ├── Components/
│   │   ├── Header.tsx        # Application header
│   │   ├── Header.styled.ts  # Header styled components
│   │   ├── Footer.tsx        # Application footer
│   │   ├── Footer.styled.ts  # Footer styled components
│   │   ├── JsonCompare.tsx   # Main comparison component
│   │   ├── JsonCompare.styled.ts # Comparison styled components
│   │   ├── Tag.tsx           # Tag component for excluded fields
│   │   ├── Tag.styled.ts     # Tag styled components
│   │   └── index.ts          # Component exports
│   ├── utils/
│   │   ├── jsonCompare.ts    # JSON comparison logic
│   │   └── jsonValidation.ts # JSON validation utilities
│   ├── App.tsx               # Main application component
│   ├── App.styled.ts         # App styled components
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── __tests__/
│   └── jsonCompare.test.ts   # Test suite for JSON comparison logic
└── package.json              # Project dependencies and scripts
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run Jest tests
- `npm test -- --watch` - Run tests in watch mode

## 🚀 GitHub Actions

This project includes automated CI/CD workflows:

### **CI Workflow** (`ci.yml`)
- **Triggers**: Every push and pull request to `main` and `develop` branches
- **Runs**: Linting, type checking, unit tests, and build verification
- **Matrix**: Tests against Node.js 18.x and 20.x
- **Artifacts**: Build files are uploaded for 7 days

### **Deploy Workflow** (`deploy.yml`)
- **Trigger**: Manual workflow dispatch
- **Purpose**: Deploy to GitHub Pages
- **Steps**: Install, test, build, and deploy to GitHub Pages

### **How to Deploy**
1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Select **"Deploy to GitHub Pages"** workflow
4. Click **"Run workflow"**
5. Click **"Run workflow"** to start deployment

The app will be available at: `https://[username].github.io/json-compare-webapp/`

## 🎨 Design Features

### **Visual Feedback**
- **Green borders** for valid JSON
- **Red borders** for invalid JSON with error highlighting
- **Real-time validation** status indicators
- **Smooth animations** and transitions

### **User Experience**
- **Responsive layout** that works on all devices
- **Keyboard shortcuts** (Enter to add excluded fields)
- **Accessible design** with proper ARIA labels
- **Error messages** with specific line and column numbers

## 🔧 Development

### **Adding New Features**
1. Create components in `src/Components/`
2. Add styled components in `ComponentName.styled.ts`
3. Extract utility functions to `src/utils/`
4. Add tests in `__tests__/`
5. Update this README

### **Code Quality**
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Prettier formatting (if configured)
- Comprehensive test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the existing issues for solutions
- Review the test examples for usage patterns
  
---

**Made with ❤️ for developers who need reliable JSON comparison tools.**

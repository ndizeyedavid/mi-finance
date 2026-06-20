# My Finance App

A personal finance management app built with React Native, Expo, and TypeScript, following a "Clay Sanctuary" design system.

## Features

### Home Screen

- Curved header with user greeting and notification bell
- Balance card showing total balance, income, and expenses
- Transaction history with custom SVG category icons
- Quick Add buttons for income and expenses
- Spending categories breakdown
- Custom calendar for date range filtering

### Stats Screen

- Beautiful Bezier curve chart with interactive point selection
- Period selector (Day/Week/Month/Year)
- Category dropdown (Expense/Income)
- Value tag tooltip that follows selected chart points
- Left/Right fade gradients on chart
- Top Spending/Top Earning items with transaction list
- Pressable transactions that highlight chart points

### Goals Screen

- Curved header with Add Goal button
- Action buttons (Create/Print/Send)
- Twin-style filter pills (Pending/Completed)
- Goal cards with progress bar, category icon, deadline, and amounts
- Empty state for no goals

### Create Goal Screen

- Curved header matching goals screen
- Custom Google Forms-style floating label inputs
- Category selector with 14 SVG category icons
- Target amount with RWF formatting
- Custom calendar modal for deadline selection
- Form validation
- Clay Sanctuary design system

## Tech Stack

- **React Native**: Cross-platform mobile app framework
- **Expo**: Development platform for React Native
- **TypeScript**: Type-safe development
- **Expo Router**: File-based navigation
- **React Native SVG & SVG Transformer**: SVG support
- **Custom Components Architecture**: Reusable UI components

## Project Structure

```
my-finance/
├── docs/                    # Documentation
│   └── superpowers/
│       └── specs/           # Design specs
├── mobile/
│   ├── app/
│   │   ├── (tabs)/          # Tab screens
│   │   │   ├── index.tsx    # Home screen
│   │   │   ├── stats.tsx    # Stats screen
│   │   │   ├── goals.tsx    # Goals screen
│   │   │   ├── profile.tsx  # Profile screen
│   │   │   └── _layout.tsx  # Tab navigator
│   │   ├── goals/
│   │   │   └── create.tsx   # Create goal screen
│   │   └── _layout.tsx      # Root navigator
│   ├── assets/
│   │   └── images/
│   │       └── icons/       # SVG category icons
│   ├── components/          # Reusable components
│   └── constants/
│       └── Colors.ts        # Color palette
├── PROJECT_CONTEXT.md       # Detailed project context
├── PRODUCT.md               # Product requirements
└── DESIGN.md                # Design system specs
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

1. Clone the repository:

```bash
cd my-finance
cd mobile
npm install
```

2. Start the development server:

```bash
npx expo start
```

3. Open the app:

- Scan the QR code with Expo Go on your mobile device
- Or press `i` to open iOS simulator, `a` for Android emulator

## Design System

- **Clay Sanctuary**: Soft, rounded corners with subtle shadows
- **Primary Color**: Teal (#58a49f)
- **Accent Colors**: Success green, danger red, info blue
- **Currency**: RWF (Rwandan Francs)
- **Typography**: Clean, readable sans-serif

## Features to Implement (High Priority)

1. Backend integration for data persistence
2. Income/Expense creation screens
3. Wallet and profile screens
4. Goal progress tracking
5. Transaction editing/deletion
6. Search/filter transactions

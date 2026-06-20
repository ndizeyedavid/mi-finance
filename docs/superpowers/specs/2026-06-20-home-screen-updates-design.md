# Design Spec: Home Screen Updates
Date: 2026-06-20
Project: my-finance

## 1. Overview
This spec covers updates to the Home Screen to replace the "Send Again" section with Quick Add buttons and a Spending Categories Breakdown, plus a reusable Calendar Modal component.

## 2. Home Screen Structure (Top to Bottom)
1. **Top Colored Container**: Greeting, notification button, Balance Card (unchanged)
2. **SVG Curve Separator**: Bow-down curve (unchanged)
3. **Transactions History Section**: (unchanged)
4. **Quick Add Buttons Section** (NEW): Two large claymorphism buttons ("Add Income" and "Add Expense")
5. **Spending Categories Breakdown Section** (NEW): Category breakdown with horizontal bars + calendar icon to open date picker modal

## 3. Components to Create/Update

### A. Quick Add Buttons
- **Location**: Home Screen, below Transactions History
- **Style**: Claymorphism (rounded corners, soft shadows)
- **Buttons**:
  - Add Income: Icon + Text, primary color (#58a49f)
  - Add Expense: Icon + Text, danger color (#F95B51)
- **Layout**: Side-by-side full-width buttons with 16px gap
- **Behavior**: Tapping logs to console for now; actual screen to be added later

### B. Spending Categories Breakdown
- **Section Header**: "Spending Breakdown" left-aligned, Calendar Icon button right-aligned
- **Category Item**:
  - Left: Category icon + name
  - Middle: Horizontal progress bar (colored)
  - Right: Amount (monospace) + Percentage
- **Mock Data Categories**: Meals, Shopping, Transport, Freelance, Salary

### C. Reusable Calendar Modal Component
- **Purpose**: Select single date or date range to filter transactions
- **Features**:
  - Monthly calendar view
  - Dots on dates with transactions
  - Single date selection mode
  - Date range selection mode
  - Tappable confirm/cancel
- **Callbacks**: `onDateSelect(date)` and `onDateRangeSelect(start, end)`
- **Design**: Claymorphism, matches app's design system

## 4. Design Consistency
- Follows "The Clay Sanctuary" design language from DESIGN.md
- Uniform spacing (sm: 8px, md: 16px, lg:24px)
- Primary teal used sparingly (<=10% of screen)
- Monospace font for all financial numbers
- Rounded corners >= 16px on all elevated elements

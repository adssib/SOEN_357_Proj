# SpendWise – SOEN 357 Project

**A Minimalist, UX-Driven Approach to Expense Tracking and Integrated Micro-Investing**

SpendWise is a mobile personal finance app built as part of a software engineering course project at Concordia University. It simplifies budgeting and automates savings through a round-up feature, offering users a clean and intuitive experience designed to promote financial literacy and long-term savings.

---

## Overview

Many students and young adults struggle with managing their finances. Existing apps are often too complex, rely on heavy manual entry, and fail to deliver lasting user engagement.

SpendWise was created to address this issue by combining:

- Simplicity and minimalism in design
- Automated savings via round-ups
- Helpful nudges and insights to build better financial habits

---

## Features

- **Round-Up Savings**  
  Automatically round up everyday purchases and save the change.

- **Bank Integration**  
  Connect multiple accounts for a complete financial overview.

- **Smart Budgeting**  
  Create and customize budget categories easily.

- **Push Notifications**  
  Alerts for bills, low balances, and spending insights.

- **Built-In Tooltips**  
  Guide users throughout the app to ensure a smooth experience.

- **Financial Insights (Coming Soon)**  
  Visualize your spending, saving, and progress over time.

---

## Tech Stack

- **Frontend**: React Native with TypeScript
- **UI/UX**: Figma + ShadCN UI
- **Platform**: Mobile-first (iOS + Android compatible)

---

## Project Structure

```
SOEN_357_Proj/
├── src/
│   ├── components/      # Reusable UI elements
│   ├── screens/         # App pages (Dashboard, Settings, etc.)
│   ├── services/        # Bank API & round-up logic
│   └── utils/           # Helper functions
├── assets/              # App icons, images
├── App.tsx              # Main app entry point
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adssib/SOEN_357_Proj.git
cd SOEN_357_Proj
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm run start
```

You’ll need either [Expo](https://docs.expo.dev/) or a native emulator (Android Studio / Xcode) to preview the app.

---

## Evaluation Results

After a 6-week user study with 20+ participants:

- 75% found setup “very easy”
- 90% were satisfied with the app design
- 55% saved between $10–15/month through round-ups
- 75% used the app at least twice a week
- 85% reported improved financial confidence

---

## User Feedback

**What users loved:**

- “I love the simplicity. It’s so easy to track everything.”
- “The round-up feature helps me save without even thinking about it.”

**What can be improved:**

- “More detailed spending reports would be helpful.”
- “Add recurring bill reminders.”
- “Some syncing delays with bank accounts.”

---

## Future Plans

- [ ] Add recurring bill & expense reminders
- [ ] Improve bank sync performance
- [ ] Provide detailed spending visualizations
- [ ] Add AI-driven saving suggestions
- [ ] Expand financial literacy content

---

## Meet the Team

Project by students of Concordia University – SOEN 357:

- Adam Al Assil
- Adib Akkari
- Idris Drouiche
- Ziad-Tarik Taufeek
- Lina Taalba

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

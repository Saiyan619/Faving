# Faving

A robust, full-stack web application designed for effective personal finance management. Users can create and manage multiple accounts (e.g., wallets, bank accounts, cash), track income and expenses, perform transfers between accounts, and gain insights through detailed analytics.

## Key Features
- **Secure Authentication**: JWT-based stateless authentication with bcrypt-hashed passwords.
- **Account Management**: Support for multiple accounts per user with atomic balance updates (stored in integer cents for precision).
- **Transaction Handling**: Income, expenses, and transfers; append-only transactions with reversal support for audit trails (no physical deletions).
- **Transfers**: Double-entry style with linked transactions and atomic updates via MongoDB sessions.
- **Analytics**: Aggregation-based stats including totals, category breakdowns, and monthly overviews, visualized with interactive charts.
- **Data Integrity**: User-scoped access control, UTC timestamps, efficient indexing, and validation on all endpoints.
- **Modern Stack**: 
  - Frontend: Next.js with TypeScript (responsive dashboard, dedicated expense/income pages).
  - Backend: Node.js, Express, TypeScript, Mongoose.
  - Database: MongoDB.

This project emphasizes security, scalability, and real-world financial best practices, making it a production-ready demonstration of full-stack development in fintech-inspired applications.

Live Demo: https://faving.vercel.app

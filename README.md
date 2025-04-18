# Invoice Generator

**Invoice Generator** is a web application that allows users to easily generate invoices based on events retrieved from an iCal calendar.

## Main Features

- User login and profile management
- Company creation with an hourly rate and an iCal link
- Automatic retrieval of events from an iCal calendar
- Invoice generation based on events and worked hours
- Automatic calculation of VAT and total amount

## Technologies Used

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)

## Installation and Usage

### 1. Clone the Project

```bash
git clone https://github.com/GuerricCo/invoice_new.git
cd invoice_new
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 3. Configure the Environment

Create a `.env` file at the root of the project and add the following:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=your_strong_secret_key
```

(You can adapt this according to your setup.)

### 4. Set up the Database

If you are using Prisma:

```bash
npx prisma migrate dev --name init
```

### 5. Start the Project

```bash
npm run dev
```

The application will be available at [http://localhost:3000].

## Project Structure

```
src/
  actions/         # Server-side functions
  components/      # React components
  lib/             # Prisma setup and other libraries
  app/             # Project pages (Next.js App Router)
```

---
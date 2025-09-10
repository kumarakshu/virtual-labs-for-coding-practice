# Virtual Labs - Coding Practice Platform

A comprehensive online coding practice platform with a browser-based IDE, built with Next.js, React, and MySQL.

## Features

- 🖥️ **Browser-based IDE** - Code directly in your browser with syntax highlighting
- 🧪 **Test Case Execution** - Run code against test cases with Judge0 API integration
- 📊 **Progress Tracking** - Track your coding progress and statistics
- 🏆 **Leaderboard** - Compete with other users and climb the rankings
- 👤 **User Authentication** - Secure login and user management
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean and intuitive interface with dark/light mode support

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Authentication**: NextAuth.js
- **Database**: MySQL
- **Code Execution**: Judge0 API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- Judge0 API key (optional, falls back to mock execution)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd virtual-labs
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update the following variables in `.env.local`:
   \`\`\`env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=virtuallabs
   
   # Judge0 API (optional)
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   JUDGE0_API_KEY=your_rapidapi_key
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Run database migrations
   npm run db:migrate
   
   # Seed sample problems
   npm run db:seed
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The platform uses the following main tables:

- **problems** - Coding problems with descriptions, examples, and test cases
- **test_cases** - Input/output test cases for each problem
- **users** - User accounts and authentication
- **submissions** - User code submissions and results
- **user_stats** - User statistics and progress tracking

## API Endpoints

### Problems
- `GET /api/problems` - List all problems with filtering
- `GET /api/problems/[id]` - Get specific problem details
- `POST /api/problems` - Create new problem (admin)

### Code Execution
- `POST /api/execute` - Execute code against test cases

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication

### Submissions
- `GET /api/submissions` - Get user submissions
- `POST /api/submissions` - Create new submission

### Leaderboard
- `GET /api/leaderboard` - Get user rankings

## Usage

### For Students

1. **Sign up** for an account or use demo credentials:
   - Email: demo@example.com
   - Password: password

2. **Browse problems** by difficulty and category

3. **Solve problems** using the browser-based IDE:
   - Select your preferred programming language
   - Write your solution
   - Run test cases to verify your code
   - Submit your final solution

4. **Track progress** on your profile and compete on the leaderboard

### For Administrators

1. Access the admin dashboard at `/admin`
2. Add new coding problems with:
   - Problem description and examples
   - Test cases (sample and hidden)
   - Starter code templates for multiple languages
3. Monitor user submissions and platform statistics

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start the production server**
   \`\`\`bash
   npm start
   \`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team

## Acknowledgments

- Judge0 API for code execution
- Radix UI for component primitives
- Tailwind CSS for styling
- Next.js team for the amazing framework

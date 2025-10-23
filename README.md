# Spend Tracker React Application

A modern, responsive spend tracker application built with React.js, TypeScript, and Vite. Features comprehensive dashboard analytics, transaction management, and rewards tracking with beautiful charts and visualizations.

## ✨ Features

### 🏠 Dashboard
- **Income Analysis Chart**: Interactive line chart showing income trends over time with future projections
- **Category Distribution**: Doughnut chart displaying spending breakdown by categories (Food & Drink, Shopping, Bills)
- **Best Card Recommendations**: Visual card suggestions for optimizing rewards on next purchases
- **Responsive Design**: Adapts beautifully to all screen sizes

### 💳 Transactions
- **Complete Transaction History**: Detailed list of all financial transactions
- **Advanced Search & Filtering**: Real-time search functionality with sorting options
- **Transaction Categories**: Visual icons and categorization for easy identification
- **Responsive Table Layout**: Optimized display for mobile and desktop

### 🎁 Rewards
- **Debit Card Visualization**: 3D-styled card display with hover effects
- **Rewards Tracking**: Real-time calculation of rewards based on spending patterns
- **Points Optimization**: Smart recommendations for maximizing cashback

### 🎨 UI/UX Features
- **Modern Sidebar Navigation**: Intuitive navigation with active state indicators
- **Consistent Design System**: Cohesive color scheme and typography
- **Interactive Elements**: Smooth transitions and hover effects
- **Mobile Responsive**: Fully optimized for all device sizes

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (faster than Create React App)
- **Charts**: Chart.js with React wrapper (react-chartjs-2)
- **Icons**: Lucide React (modern, lightweight icons)
- **Styling**: Custom CSS with modular approach
- **Development**: Hot Module Replacement (HMR) for instant updates

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Running

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production  
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx     # Main dashboard with charts
│   ├── Dashboard.css     # Dashboard styles
│   ├── Transactions.tsx  # Transaction management
│   ├── Transactions.css  # Transaction styles
│   ├── Rewards.tsx       # Rewards page
│   ├── Rewards.css       # Rewards styles
│   ├── Sidebar.tsx       # Navigation sidebar
│   └── Sidebar.css       # Sidebar styles
├── App.tsx              # Main app component
├── App.css              # Global app styles
├── index.css            # Global CSS reset/base
└── main.tsx             # App entry point
```

## 📊 Sample Data Included

- **13+ Transaction Records**: Realistic financial transactions with dates, amounts, and categories
- **Multiple Account Types**: Bank transfers, payments, deposits
- **Category Analytics**: Food & drink, shopping, bills breakdown  
- **Reward Calculations**: Cashback estimates for different card types

## 🎯 Key Components

### Dashboard Component
- Interactive Chart.js line chart for income analysis
- Doughnut chart for category distribution
- Card recommendation system with visual previews
- Responsive grid layout

### Transactions Component  
- Searchable transaction table
- Real-time filtering and sorting
- Icon-based transaction categorization
- Mobile-optimized responsive design

### Rewards Component
- 3D CSS card visualization
- Hover effects and animations
- Rewards calculation display
- Modern card design aesthetics

### Sidebar Navigation
- Clean, intuitive navigation
- Active state management
- Search functionality
- Responsive collapse on mobile

## 🔧 Customization

### Theming
Easily customize colors and styling:
- Component-specific CSS files
- Consistent color variables
- Modular design system

### Data Integration
Replace placeholder data with real APIs:
- Modify transaction data in `Transactions.tsx`
- Update chart data sources in `Dashboard.tsx`
- Integrate with your backend services

## 📱 Mobile Responsiveness

- **Mobile-First Design**: Optimized for all screen sizes
- **Touch-Friendly**: Appropriate button sizes and spacing
- **Responsive Tables**: Intelligent column hiding on small screens
- **Performance**: Optimized for mobile browsers

## ⚡ Performance Features

- **Vite Build Tool**: Lightning-fast development builds
- **Tree Shaking**: Automatic removal of unused code
- **Chart.js Optimization**: Only imports required chart components
- **CSS Optimization**: Minimal, scoped component styles

## 🌟 Future Enhancements

- [ ] Dark mode toggle
- [ ] Data export functionality (CSV, PDF)
- [ ] Advanced filtering options
- [ ] Budget setting and tracking
- [ ] Expense categorization automation
- [ ] Banking API integration
- [ ] Push notifications for spending alerts
- [ ] Multi-currency support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern fintech applications
- Chart.js community for excellent charting library
- React community for best practices and patterns
- Lucide React for beautiful, consistent icons

---

**Ready to track your spending?** Start the development server and explore the application at `http://localhost:5173`! 🚀

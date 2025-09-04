# Burns Farm Shop

A mobile-friendly web application for Burns Farm Campsite that allows customers to order groceries and gifts for delivery to their cabin or pitch.

## Features

### Customer Features
- **Product Catalog**: Browse groceries, gifts, and essentials with category filtering
- **Shopping Cart**: Add/remove items with quantity controls
- **Checkout Process**: 
  - Select accommodation (cabins and hardstanding pitches from Burns Farm)
  - Choose delivery time slot
  - Enter contact details
  - Order confirmation
- **Mobile Responsive**: Optimized for mobile devices

### Admin Features
- **Order Management**: View, filter, and update order status
- **Product Management**: Add, edit, and delete products
- **Reports Dashboard**: 
  - Revenue analytics
  - Order statistics
  - Top products
  - Category performance
- **Real-time Updates**: Live order tracking and management

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Charts**: Recharts
- **Icons**: Heroicons
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GHaigh/burnsfarmshop.git
cd burnsfarmshop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── basket/            # Shopping cart page
│   ├── checkout/          # Checkout process
│   └── page.tsx           # Main shop page
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   └── ProductCard.tsx   # Product display component
├── contexts/             # React contexts
│   └── CartContext.tsx   # Shopping cart state
└── types/               # TypeScript type definitions
    └── index.ts         # Application types
```

## Accommodation Options

The app includes the following accommodation options from Burns Farm:

### Cabins
- Low Rigg View Touring
- High Rigg View Touring
- Tewet Campfield
- Skiddaw Campfield
- Blease Campfield

### Hardstanding Pitches
- Hardstanding Pitch 1-5

## Delivery Slots

Orders can be scheduled for delivery in the following time slots:
- 8:00 AM - 9:00 AM
- 9:00 AM - 10:00 AM
- 10:00 AM - 11:00 AM
- 11:00 AM - 12:00 PM
- 12:00 PM - 1:00 PM
- 1:00 PM - 2:00 PM
- 2:00 PM - 3:00 PM
- 3:00 PM - 4:00 PM

## Payment Integration

This is a demonstration application. In production, it would integrate with SumUp for payment processing.

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables can be configured in Vercel dashboard

## Demo Data

The application includes mock product data for demonstration purposes. In production, this would be replaced with a real database and API.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for demonstration purposes.
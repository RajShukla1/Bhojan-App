import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

test('renders Header with Bhojan brand and navigation links', () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(/Bhojan/i)).toBeInTheDocument();
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/About/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart/i)).toBeInTheDocument();
});

test('renders Footer with branding and copyright', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  expect(screen.getByText(/Raj Shukla/i)).toBeInTheDocument();
});

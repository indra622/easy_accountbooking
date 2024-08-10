import React from 'react'; // React를 명시적으로 가져옵니다.
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './page';

describe('Home component', () => {
  it('renders correctly', () => {
    render(<Home />);
    expect(screen.getByText('Expense Tracker')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/Category:/i), {
      target: { value: 'Test Category' },
    });

    fireEvent.change(screen.getByLabelText(/Item:/i), {
      target: { value: 'Test Item' },
    });

    fireEvent.change(screen.getByLabelText(/Amount:/i), {
      target: { value: '100' },
    });

    fireEvent.click(screen.getByText('Add Expense'));

    expect(screen.getByText('Add Expense')).toBeInTheDocument();
  });
});

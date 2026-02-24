
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies variant styles', () => {
      render(<Button variant="danger">Delete</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toHaveClass('btn-danger');
    });

    it('shows loading state', () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(screen.getByRole('button')).not.toHaveTextContent('Submit');
    });

    it('supports custom className', () => {
      render(<Button className="my-custom-btn">Save</Button>);
      expect(screen.getByRole('button')).toHaveClass('my-custom-btn');
    });
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Submit</Button>);
      await user.click(screen.getByRole('button', { name: /submit/i }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('respects disabled prop and does not call onClick', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Button disabled onClick={onClick}>Disabled</Button>);
      await user.click(screen.getByRole('button', { name: /disabled/i }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Button loading onClick={onClick}>Save</Button>);
      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

});

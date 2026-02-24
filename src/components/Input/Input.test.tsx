import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders correctly with default props', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Your email" />);
      expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Name" placeholder="Name" />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it('shows required indicator when required', () => {
      render(<Input label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('supports different types', () => {
      render(<Input type="email" placeholder="Email" />);
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
    });
  });

  describe('interactions', () => {
    it('updates value on change', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn((e) => expect(e.target.value).toBeDefined());
      render(<Input label="Name" value="" onChange={handleChange} />);
      const input = screen.getByLabelText(/name/i);
      await user.type(input, 'John');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles focus and blur', async () => {
      const user = userEvent.setup();
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      render(<Input label="Field" onFocus={onFocus} onBlur={onBlur} />);
      const input = screen.getByLabelText(/field/i);
      await user.click(input);
      expect(onFocus).toHaveBeenCalled();
      await user.tab();
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('shows error message when error prop is set', () => {
      render(<Input label="Email" error="Invalid email" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
    });

    it('validates required field is present in DOM', () => {
      render(<Input label="Required" required />);
      const input = screen.getByLabelText(/required/i);
      expect(input).toBeRequired();
    });

    it('renders without label (no crash)', () => {
      render(<Input placeholder="No label" />);
      expect(screen.getByPlaceholderText('No label')).toBeInTheDocument();
    });
  });
});

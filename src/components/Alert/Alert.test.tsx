import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders correctly with default props', () => {
      render(<Alert>Info message</Alert>);
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });

    it('renders with variant styles', () => {
      const { container } = render(<Alert variant="error">Error</Alert>);
      expect(container.querySelector('.alert-error')).toBeInTheDocument();
    });

    it('renders dismiss button when dismissible', () => {
      render(<Alert dismissible>Dismiss me</Alert>);
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });

    it('does not render dismiss button when not dismissible', () => {
      render(<Alert>No dismiss</Alert>);
      expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onDismiss when dismiss button clicked', async () => {
      const user = userEvent.setup();
      const onDismiss = jest.fn();
      render(<Alert dismissible onDismiss={onDismiss}>Message</Alert>);
      await user.click(screen.getByRole('button', { name: /dismiss/i }));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('hides alert after dismiss', async () => {
      const user = userEvent.setup();
      render(<Alert dismissible>Message</Alert>);
      expect(screen.getByText('Message')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /dismiss/i }));
      expect(screen.queryByText('Message')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('renders all variants without crash', () => {
      const variants = ['info', 'success', 'warning', 'error'] as const;
      variants.forEach((variant) => {
        const { unmount } = render(<Alert variant={variant}>{variant}</Alert>);
        expect(screen.getByText(variant)).toBeInTheDocument();
        unmount();
      });
    });
  });
});

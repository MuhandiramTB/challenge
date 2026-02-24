
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies variant class', () => {
      render(<Button variant="danger">Delete</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toHaveClass('btn-danger');
    });

    it('when loading, shows loading content', () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(screen.getByRole('button')).not.toHaveTextContent('Submit');
    });
  });

  describe('TDD Bug: disabled button still fires onClick (event handler called when it should not be)', () => {
    // RED: Write a failing test that exposes the bug
    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole('button', { name: /disabled/i });
      await user.click(button);
      // We expect the handler NOT to be called — bug: component doesn't set disabled on the DOM button
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('TDD Bug: loading button still fires onClick (accessibility / double-submit)', () => {
    // RED: When loading, user could click again; handler should not run
    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(
        <Button loading onClick={onClick}>
          Save
        </Button>
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('click behavior when enabled and not loading', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Submit</Button>);
      await user.click(screen.getByRole('button', { name: /submit/i }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});

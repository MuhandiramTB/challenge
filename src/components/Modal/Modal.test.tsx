import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  describe('rendering', () => {
    it('renders correctly when closed (returns null)', () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="Test">
          <p>Content</p>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders correctly when open with title and children', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog', { name: /test modal/i })).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('renders without title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content only</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Content only')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={onClose} title="Test">
          <p>Content</p>
        </Modal>
      );
      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={onClose} title="Test">
          <p>Content</p>
        </Modal>
      );
      const overlay = document.querySelector('.modal-overlay');
      if (overlay) await user.click(overlay as HTMLElement);
      expect(onClose).toHaveBeenCalled();
    });

    it('calls onClose when Escape is pressed', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={onClose} title="Test">
          <p>Content</p>
        </Modal>
      );
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('focus trap', () => {
    it('traps focus with Tab key — wraps from last to first focusable element', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={onClose} title="Trap">
          <input data-testid="first" />
          <button>Action</button>
        </Modal>
      );
      // Focus the first input
      const firstInput = screen.getByTestId('first');
      firstInput.focus();
      // The close button is the last focusable element
      const closeBtn = screen.getByRole('button', { name: /close/i });
      closeBtn.focus();
      // Tab from last element should wrap to first
      await user.tab();
      // After wrapping, focus should be on the first focusable (the input)
      expect(document.activeElement).toBe(firstInput);
    });

    it('traps focus with Shift+Tab — wraps from first to last focusable element', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={onClose} title="Trap">
          <input data-testid="first" />
          <button>Action</button>
        </Modal>
      );
      const firstInput = screen.getByTestId('first');
      firstInput.focus();
      // Shift+Tab from first element should wrap to last
      await user.tab({ shift: true });
      const closeBtn = screen.getByRole('button', { name: /close/i });
      expect(document.activeElement).toBe(closeBtn);
    });
  });

  describe('edge cases', () => {
    it('does not call onClose when clicking inside modal content', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={onClose} title="Test">
          <p>Content</p>
        </Modal>
      );
      await user.click(screen.getByText('Content'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('has accessibility attributes when open', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Accessible">
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
  });
});

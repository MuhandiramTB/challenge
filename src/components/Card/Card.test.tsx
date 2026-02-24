import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders correctly with default props', () => {
      render(<Card><p>Body</p></Card>);
      expect(screen.getByText('Body')).toBeInTheDocument();
    });

    it('renders correctly with custom props', () => {
      render(
        <Card title="My Card" image="/test.jpg">
          <p>Content</p>
        </Card>
      );
      expect(screen.getByText('My Card')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpg');
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Card title="Title Only"><p>Body</p></Card>);
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title Only');
    });

    it('renders actions when provided', () => {
      render(
        <Card title="Card" actions={<button>Action</button>}>
          <p>Body</p>
        </Card>
      );
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
    });

    it('supports custom className', () => {
      const { container } = render(<Card className="my-card"><p>Body</p></Card>);
      expect(container.querySelector('.my-card')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('handles user interaction with actions slot', async () => {
      const user = userEvent.setup();
      const onAction = jest.fn();
      render(
        <Card title="Card" actions={<button onClick={onAction}>Action</button>}>
          <p>Body</p>
        </Card>
      );
      await user.click(screen.getByRole('button', { name: /action/i }));
      expect(onAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('renders without title (no crash)', () => {
      render(<Card><p>Body</p></Card>);
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('renders image with empty alt when title is missing', () => {
      render(<Card image="/img.jpg"><p>Body</p></Card>);
      expect(screen.getByRole('img')).toHaveAttribute('alt', '');
    });
  });
});

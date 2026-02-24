/**
 * Integration test: Dropdown affecting other components
 * Selecting a value in dropdown updates displayed text elsewhere.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Dropdown } from '../../components/Dropdown/Dropdown';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

function DropdownWithDisplay() {
  const [selected, setSelected] = useState<string | undefined>();
  return (
    <>
      <Dropdown
        items={options}
        value={selected}
        onChange={setSelected}
        label="Choose"
        placeholder="Select..."
      />
      {selected && <p data-testid="display">Selected: {selected}</p>}
    </>
  );
}

describe('Integration: Dropdown affecting other components', () => {
  it('selecting dropdown option updates displayed value', async () => {
    const user = userEvent.setup();
    render(<DropdownWithDisplay />);
    expect(screen.queryByTestId('display')).not.toBeInTheDocument();
    await user.click(screen.getByRole('combobox', { name: /choose/i }));
    await user.click(screen.getByRole('option', { name: /option b/i }));
    expect(screen.getByTestId('display')).toHaveTextContent('Selected: b');
  });
});
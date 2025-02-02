import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommonFiltersForm } from '../../../../src/features/forms/CommonFiltersForm/CommonFiltersForm';

const mockFiltersOnChange = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderComponent = (initialFilters = {}) => {
  render(
    <CommonFiltersForm
      initialFilters={initialFilters}
      onChange={mockFiltersOnChange}
    />
  );
};

describe('CommonFiltersForm', () => {
  beforeEach(() => {
    mockFiltersOnChange.mockClear();
  });

  test('renders the form correctly', () => {
    renderComponent();
    expect(screen.getByLabelText(/createdAt.from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/createdAt.by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/updatedAt.from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/updatedAt.by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sorting.byField/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sorting.direction/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submitButton/i })).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  })

  test('resets filters on reset button click', () => {
    renderComponent();
    const input = screen.getByLabelText(/createdAt.from/i);
    fireEvent.change(input, { target: { value: '1900-01-01T00:01' } });
    fireEvent.click(screen.getByText(/reset/i));
    expect(input).toHaveValue('');
  });

  test('calls onChange on valid submit', async () => {
    renderComponent();
    const submitButton = screen.getByRole('button', { name: /submitButton/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockFiltersOnChange).toHaveBeenCalled();
    });
  });
});

describe('CommonFiltersForm - CreatedAt.fron Input', () => {

  beforeEach(() => {
    mockFiltersOnChange.mockClear();
  });

  test('renders input with lable text', () => {
    renderComponent();
    const inputElement = screen.getByLabelText(/createdAt.from/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('updates input value correctly and calls onChange on form submit', async () => {
    renderComponent({ createdAt: { gte: '' } });

    const inputElement = screen.getByLabelText(/createdAt.from/i);
    fireEvent.change(inputElement, { target: { value: '1900-01-01T00:01' } });

    expect(inputElement).toHaveValue('1900-01-01T00:01');

    const submitButton = screen.getByRole('button', { name: /submitButton/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFiltersOnChange).toHaveBeenCalledWith({ createdAt: { gte: '1900-01-01T00:01' } });
    });
  });

  test('renders input with initial value', () => {
    renderComponent({ createdAt: { gte: '1900-01-01T00:01' } });
    const inputElement = screen.getByLabelText(/createdAt.from/i);
    expect(inputElement).toHaveValue('1900-01-01T00:01');
  });

});

//

describe('CommonFiltersForm - Sorting Select', () => {

  beforeEach(() => {
    mockFiltersOnChange.mockClear();
  });

  test('renders sorting select with no initial value', () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/sorting.byField/i);
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('');
  });

  test('renders sorting select with initial value', () => {
    renderComponent({ sorting: { field: 'createdAt', type: 'ASC' } });
    const selectElement = screen.getByLabelText(/sorting.byField/i);
    expect(selectElement).toHaveValue('createdAt');
  });

  test('calls handleChange when select value changes', () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/sorting.byField/i);

    fireEvent.change(selectElement, { target: { value: 'id' } });
    expect(selectElement).toHaveValue('id');
  });

  test('resets sorting field when selecting "no sorting" option', () => {
    renderComponent({ sorting: { field: 'name', type: 'DESC' } });
    const selectElement = screen.getByLabelText(/sorting.byField/i);

    fireEvent.change(selectElement, { target: { value: '' } });
    expect(selectElement).toHaveValue('');
  });

  test('calls onChange with correct data on form submit', async () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/sorting.byField/i);
    const submitButton = screen.getByRole('button', { name: /submitButton/i });

    fireEvent.change(selectElement, { target: { value: 'updatedAt' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFiltersOnChange).toHaveBeenCalledWith({ sorting: { field: 'updatedAt', type: 'ASC' } });
    });
  });

  test('changes sorting type to DESC after changing field', async () => {
    renderComponent({ sorting: { field: 'id', type: 'DESC' } });
    const selectElement = screen.getByLabelText(/sorting.byField/i);
    const submitButton = screen.getByRole('button', { name: /submitButton/i });

    fireEvent.change(selectElement, { target: { value: 'name' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFiltersOnChange).toHaveBeenCalledWith({ sorting: { field: 'name', type: 'DESC' } });
    });
  });
});
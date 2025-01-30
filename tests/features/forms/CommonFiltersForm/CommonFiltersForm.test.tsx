import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as yup from 'yup';
import { CommonFilters } from '../../../../src/shared/types/serverTypes';
import { CommonFiltersForm } from '../../../../src/features/forms/CommonFiltersForm/CommonFiltersForm';

const initialFilters: CommonFilters = {
    createdAt: { gte: '', lte: '' },
    updatedAt: { gte: '', lte: '' },
    sorting: { field: 'id', type: 'ASC' },
};

const mockOnChange = jest.fn();

const renderComponent = (props = {}) => {
    return render(
        <CommonFiltersForm onChange={mockOnChange} initialFilters={initialFilters} {...props} />
    );
};

describe('CommonFiltersForm', () => {
    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test('renders the form correctly', () => {
        renderComponent();
        expect(screen.getByLabelText(/createdAt/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/updatedAt/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/sorting/i)).toBeInTheDocument();
    });

    test('updates filters on input change', () => {
        renderComponent();
        const input = screen.getByLabelText(/createdAt.*from/i);
        fireEvent.change(input, { target: { value: '2023-09-19T10:37:16.389Z' } });
        expect(input).toHaveValue('2023-09-19T10:37:16.389Z');
    });

    test('resets filters on reset button click', () => {
        renderComponent();
        const input = screen.getByLabelText(/createdAt.*from/i);
        fireEvent.change(input, { target: { value: '2023-09-19T10:37:16.389Z' } });
        fireEvent.click(screen.getByText(/reset/i));
        expect(input).toHaveValue('');
    });

    test('validates date range correctly', async () => {
        renderComponent();
        const fromInput = screen.getByLabelText(/createdAt.*from/i);
        const toInput = screen.getByLabelText(/createdAt.*by/i);
        fireEvent.change(fromInput, { target: { value: '2023-09-20T10:37:16.389Z' } });
        fireEvent.change(toInput, { target: { value: '2023-09-19T10:37:16.389Z' } });
        fireEvent.submit(screen.getByRole('form'));
        expect(await screen.findByText(/LteLessGte/i)).toBeInTheDocument();
    });

    test('calls onChange on valid submit', async () => {
        renderComponent();
        fireEvent.submit(screen.getByRole('form'));
        expect(mockOnChange).toHaveBeenCalled();
    });
});

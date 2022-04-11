import '@testing-library/jest-dom'

Date.now = jest.fn(() => new Date(Date.UTC(2022, 1, 1)).valueOf())

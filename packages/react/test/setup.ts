import '@testing-library/jest-dom'

// Make dates stable across runs
Date.now = jest.fn(() => new Date(Date.UTC(2022, 1, 1)).valueOf())

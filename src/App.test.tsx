import '@testing-library/jest-dom'
import App from './App'
import { renderWithProviders } from './utils/test-utils'

test('Renders the main page', () => {
    renderWithProviders(<App />)
    expect(true).toBeTruthy()
})


import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('renders header', () => {
  render(<BrowserRouter><App /></BrowserRouter>)
  expect(screen.getByText(/LoopCard/)).toBeInTheDocument()
})

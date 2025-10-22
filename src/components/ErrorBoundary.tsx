import { Component, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; error?: any }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any) {
    console.error('App crash:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card text-center p-6">
          <h1 className="text-xl font-semibold mb-2">Something went wrong.</h1>
          <pre className="text-xs bg-gray-100 rounded p-2 overflow-auto text-left">
            {String(this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

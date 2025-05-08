import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary p-4 text-center">
          <h3 className="text-danger mb-3">حدث خطأ أثناء معالجة الدفع</h3>
          <p>نعتذر عن هذا الخطأ. الرجاء المحاولة مرة أخرى أو الاتصال بالدعم.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
          >
            إعادة المحاولة
          </button>
          {this.props.showDetails && (
            <details className="mt-3 text-start">
              <summary>تفاصيل الخطأ التقني</summary>
              <p>{this.state.error && this.state.error.toString()}</p>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
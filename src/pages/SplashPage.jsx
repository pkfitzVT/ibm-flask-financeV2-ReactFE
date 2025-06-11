import { Link } from 'react-router-dom';

export default function SplashPage() {
  return (
    <div className="container p-4 text-center">
      <h1>Welcome to the Transaction Analysis App</h1>
      <p className="lead">
        Analyze your financial transactions with built-in regression and A/B
        testing tools.
      </p>
      <div className="mt-4">
        <Link to="/register" className="btn btn-primary mx-2">
          Register
        </Link>
        <Link to="/login" className="btn btn-secondary mx-2">
          Login
        </Link>
      </div>
      <p className="mt-5 text-muted">
        Once you’re registered and logged in, you can view your transactions,
        run regression analyses, and perform A/B tests.
      </p>
    </div>
  );
}

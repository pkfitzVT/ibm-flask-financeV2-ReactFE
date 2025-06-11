import { Outlet, Link } from 'react-router-dom';

export default function AnalysisDashboard() {
  return (
    <div>
      <h1>Analysis</h1>
      <nav>
        <Link to="regression">Regression</Link> |{' '}
        <Link to="abtest">A/B Test</Link>
      </nav>
      <Outlet /> {/* Renders RegressionPage or AbTestPage */}
    </div>
  );
}

// And in your index of that folder:
//
// <Routes>
//   <Route path="/" element={<AnalysisDashboard />}>
//     <Route path="regression" element={<RegressionPage />} />
//     <Route path="abtest"    element={<AbTestPage />} />
//   </Route>
// </Routes>

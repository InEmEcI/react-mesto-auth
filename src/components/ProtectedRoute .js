import { Navigate } from "react-router-dom";

function ProtectedRoute({ loginIn, children }) {
  if (!loginIn) {
    return <Navigate to="/sing-in" />;
  }
  return children;
}

export default ProtectedRoute;

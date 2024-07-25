import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./config/authContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
            <Route path="/chat" element={<ChatPage />} />
         
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
        <Toaster position="top-right" gutter={16} />
        {/* Add Toaster component here */}
      </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;

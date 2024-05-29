
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Posts from './components/Posts';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/Admin/AdminDashboard';
import CreatePostForm from './components/Admin/CreatePostForm';
import PostList from './components/Admin/PostList';
import SendEmailForm from './components/Admin/SendEMailForm';
import UserList from './components/Admin/UserList';
import Confirm from './components/Confirm';
import EmailConfirmed from './components/EmailConfirmed';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/validate" element={<UserProfile />} />

        <Route path="/admin/stats" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/posts" element={<PostList />} />
        <Route path="/admin/create-posts" element={<CreatePostForm />} />
        <Route path="/admin/send-email" element={<SendEmailForm />} />

        <Route path="/email-confirm" element={<Confirm />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />
      </Routes>
    </Router>
  );
};

export default App;

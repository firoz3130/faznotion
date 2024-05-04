import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Blog } from './pages/Blog';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/PublishBlog';
import { UserProfile } from './pages/UserProfile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

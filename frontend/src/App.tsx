import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Blog } from './pages/Blog';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/PublishBlog';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

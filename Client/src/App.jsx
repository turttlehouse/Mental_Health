import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/User/Register'
import Login from './pages/User/Login'
import Mentalhealth from './pages/mental health/Mentalhealth'
import Healthyliving from './pages/healthyliving/healthyliving'
import AddArticle from './pages/Article/AddArticle'
import ProtectedRoute from './pages/Protectedroute'
import { AuthProvider } from './context/AuthContext'
import Articlepage from './pages/Article/Articlepage'
import ArticleDetail from './pages/Article/ArticleDetail'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminArticleDetails from './pages/Admin/AdminArticleDetails'
import Profile from './pages/User/Profile'
import UserArticleDetails from './pages/User/UserArticleDetails'

function App() {

  return (

    <AuthProvider>
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Home/>}  />  
      <Route path = '/register' element={<Register/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/mentalhealth' element={<Mentalhealth/>}/>
      <Route path = '/healthyliving' element={<Healthyliving/>}/>
      <Route path = '/articles' element={<Articlepage/>}/>
      <Route path="/article/:id" element={<AdminArticleDetails />} />
      <Route path="/articles/:id" element={<ArticleDetail/>} />
      <Route path="/userarticles/:id" element={<UserArticleDetails/>} />
      <Route path = '/dashboard' element={<AdminDashboard/>}/>
      <Route path = '/profile' element={<Profile/>}/>
      <Route path = '/addarticle' element={<ProtectedRoute><AddArticle /></ProtectedRoute>} />
     
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App

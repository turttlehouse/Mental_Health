import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/User/Register'
import Login from './pages/User/Login'
import Mentalhealth from './pages/mental health/Mentalhealth'
import Healthyliving from './pages/healthyliving/healthyliving'
import AddArticle from './pages/AddArticle'
import ProtectedRoute from './pages/Protectedroute'
import { AuthProvider } from './context/AuthContext'
import Articlepage from './pages/Articlepage'
import AdminDashboard from './pages/AdminDashboard'
import ArticleDetail from './pages/ArticleDetail'

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
      <Route path = '/addarticle' element={<AddArticle/>}/>
      <Route path = '/articles' element={<Articlepage/>}/>
      <Route path="/articles/:id" element={<ArticleDetail/>} />
      <Route path = '/dashboard' element={<AdminDashboard/>}/>
      <Route path = '/protectedroute' element={<ProtectedRoute><AddArticle /></ProtectedRoute>} />
     
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

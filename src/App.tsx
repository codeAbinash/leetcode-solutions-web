import './scss/index.scss'

import Home from './pages/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import React from 'react'
import Loading from './components/Loading'

export default function App() {
  return <Router basename='/leetcode-solutions-web'>
    <React.Suspense fallback={<Loading />}>
      <Routes >
        <Route path='/' element={<Home />} />
      </Routes>
    </React.Suspense>
  </Router>
}
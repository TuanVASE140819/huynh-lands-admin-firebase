import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthComponent from './layout/AuthComponent'
import RootLayout from './layout/RootLayout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { route } from './routes/router'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            {route?.map(
              ({ index, path, Component, isAuth, isCheckIn, redirectPath }) => (
                <Route
                  index={index}
                  key={path}
                  path={path}
                  element={
                    <AuthComponent
                      isAuth={isAuth}
                      isCheckIn={isCheckIn}
                      Component={Component}
                      redirectPath={redirectPath}
                    />
                  }
                />
              ),
            )}
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

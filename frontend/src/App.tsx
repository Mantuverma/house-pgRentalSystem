import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,

} from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./page/Register"
import SignIn from "./page/Signin"
import AddHotel from "./page/AddHotel"
import { useAppContext } from "./contexts/AppContext"
import MyHotels from "./page/MyHotels"
import EditHotel from "./page/EditHotel"
function App() {
  const { isLoggedIn } = useAppContext()
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
          />
          <Route path="/search" element={
            <Layout>
              <p>Search page</p>
            </Layout>
          } />
          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>
          }
          />
          <Route path="/signin" element={
            <Layout>
              <SignIn />
            </Layout>
          }
          />
          {isLoggedIn && (
            <>
              <Route
                path="/addhotel"
                element={
                  <Layout>
                    <AddHotel />
                  </Layout>
                }
              />
              <Route
                path="/edithotel/:hotelId"
                element={
                  <Layout>
                    <EditHotel />
                  </Layout>
                }
              />
              <Route
                path="/myhotel"
                element={
                  <Layout>
                    <MyHotels />
                  </Layout>
                }
              />
            </>
          )}
          <Route path="*" element={
            <Navigate to="/" />
          } />
        </Routes>

      </Router>
    </>
  )
}

export default App

import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import SignOutButton from "./SignOutButton"
const Header = () => {
    const { isLoggedIn } = useAppContext()
    return (
        <div className="bg-blue-800  py-6">
            <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">HouseRental.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="flex items-center rounded-sm h-10 text-white px-3 font-bold hover:bg-blue-600"
                                to="/my-bookings"
                            >
                                My Bookings
                            </Link>
                            <Link
                                to="/myhotel"
                                className="flex rounded-sm items-center text-white px-3 font-bold hover:bg-blue-600"

                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="flex rounded-sm bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
                            >
                                Sign up
                            </Link>
                            <Link
                                to="/signin"
                                className="flex rounded-sm bg-white items-center h-10 text-blue-600 px-3 font-bold hover:bg-gray-100"
                            >
                                Sign In
                            </Link>

                        </>

                    )}
                </span>
            </div>
        </div>
    )
}

export default Header

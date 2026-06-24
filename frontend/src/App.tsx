import './App.css'
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import RegisterPage from "./ui/pages/auth/RegisterPage/RegisterPage.tsx";
import LoginPage from "./ui/pages/auth/LoginPage/LoginPage.tsx";
import Layout from "./ui/components/layout/layout/Layout.tsx";
import HomePage from "./ui/pages/home/HomePage.tsx";
import ProtectedRoute from "./ui/components/routing/ProtectedRoute/ProtectedRoute.tsx";
import RentalsProvider from "./providers/rentalsProvider.tsx";
import RentalsPage from "./ui/pages/rental/RentalsPage/RentalsPage.tsx";
import HostsProvider from "./providers/hostsProvider.tsx";
import HostsPage from "./ui/pages/hosts/HostsPage/HostsPage.tsx";
import CountriesProvider from "./providers/countriesProvider.tsx";
import CountriesPage from "./ui/pages/countries/CountryPage/CountryPage.tsx";
import RentalDetailsPage from "./ui/pages/rental/RentalDetailsPage/RentalDetailsPage.tsx";
import RentalDetailsProvider from "./providers/rentalDetailsProvider.tsx";
import CountryDetailsProvider from "./providers/countryDetailsProvider.tsx";
import HostDetailsProvider from "./providers/hostDetailsProvider.tsx";
import CountryDetailsPage from "./ui/pages/countries/CountryDetailsPage/CountryDetailsPage.tsx";
import HostDetailsPage from "./ui/pages/hosts/HostDetailsPage/HostDetailsPage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route
                            element={
                                <CountriesProvider>
                                    <HostsProvider>
                                        <RentalsProvider>
                                            <Outlet/>
                                        </RentalsProvider>
                                    </HostsProvider>
                                </CountriesProvider>
                            }
                        >
                            <Route path="rentals" element={<RentalsPage/>}/>
                            <Route path="hosts" element={<HostsPage/>}/>
                            <Route path="countries" element={<CountriesPage/>}/>
                        </Route>
                        <Route path="rentals/:id" element={
                            <RentalDetailsProvider>
                                <RentalDetailsPage />
                            </RentalDetailsProvider>
                        } />

                        <Route path="hosts/:id" element={
                            <HostDetailsProvider>
                                <HostDetailsPage />
                            </HostDetailsProvider>
                        } />

                        <Route path="countries/:id" element={
                            <CountryDetailsProvider>
                                <CountryDetailsPage />
                            </CountryDetailsProvider>
                        } />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

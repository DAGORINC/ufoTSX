import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Layout from '../components/layout/Layout';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { useEffect } from 'react';

export default function Router() {

    useEffect(() => {
        getShowroomUrl();
    }, [])

    function getShowroomUrl() {
        const selectedShowroom = localStorage.getItem("selectedShowroom");

        if (selectedShowroom !== "minsk" && selectedShowroom !== "piaseczno" && window.location.pathname !== "/wybierz-salon") {
            window.location.href = "/wybierz-salon";
            return null;
        } else {
            return null;
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route
                            path={route.url}
                            element={<CurrentLayout Component={route.component} hasStandardLayout={route.hasStandardLayout} title={route.name} />}
                            key={index}
                        />
                    ))
                }
                <Route path="*" element={<CurrentLayout Component={NotFoundPage} hasStandardLayout={true} title={'Nie znaleziono'}/>} />
            </Routes>
        </BrowserRouter>
    )
}

const CurrentLayout = ({ Component, hasStandardLayout, title }) => {
    return (
        <>
            {
                hasStandardLayout ? (
                    <Layout title={title}>
                        <Component />
                    </Layout>
                ) : (
                    <Component />
                )
            }
        </>
    )
}
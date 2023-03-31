import React, { Fragment } from "react"
import { Route, Navigate } from 'react-router-dom'
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from "./pages/CreatePage"
import { AuthPage } from "./pages/AuthPage"
import { DetailPage } from "./pages/DetailPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Fragment>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Route path="/">
                    <Navigate to="/create" replace />
                    <LinksPage />
                </Route>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Fragment>
    )
}
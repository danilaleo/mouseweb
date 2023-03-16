import React from "react"
import {Route, Navigate} from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage"
import {CreatePage} from "./pages/CreatePage"
import {AuthPage} from "./pages/AuthPage"
import {DetailPage} from "./pages/DetailPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage/>
                </Route>
                <Navigate to="/create" />
                    <LinksPage/>
            </>
        )
    }
    return (
        <>
            <Route path="/" element = {<AuthPage />}/>
            <Route path="*" element = {<Navigate to ="/" />}/>
        </>
    )
}
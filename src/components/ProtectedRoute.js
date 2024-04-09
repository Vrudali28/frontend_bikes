import { Route, Navigate } from 'react-router-dom';
import React from 'react';

export function ProtectedRoute({ ...props }) {
    if (localStorage.getItem('user')) {
        return <Route {...props} />;
    } else {
        return (
            <Route {...props}>
                <Navigate to='/login' />
            </Route>
        );
    }
}

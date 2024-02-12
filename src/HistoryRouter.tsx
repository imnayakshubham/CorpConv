import { ReactNode, useLayoutEffect, useState } from "react"
import { Router } from "react-router-dom"

interface HistoryRouterProps {
    basename: string;
    children: ReactNode;
    history: {
        action: string;
        location: any;
        listen(callback: () => void): void;
    };
}

export function HistoryRouter({
    basename,
    children,
    history }: HistoryRouterProps) {
    let [state, setState] = useState({
        action: history.action,
        location: history.location,
    })

    useLayoutEffect(() => history.listen(() => setState({
        action: history.action,
        location: history.location,
    })), [history]);

    return (
        <Router
            basename={basename}
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    )
}

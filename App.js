import React, {useState} from 'react'
import {AppLoading} from 'expo'
import {AppNavigation} from './src/navigation/AppNavigation'
import {bootstrap} from './src/bootstrap'
import {ListState} from "./src/context/listItem/ListState";
import {SocketState} from "./src/context/socket/SocketState";

export default function App() {
    const [isReady, setIsReady] = useState(false)

    if (!isReady) {
        return (
            <AppLoading
                startAsync={bootstrap}
                onFinish={() => setIsReady(true)}
                onError={err => console.log(err)}
            />
        )
    }

    return (
        <ListState>
            <SocketState>
                <AppNavigation/>
            </SocketState>
        </ListState>

    )
}

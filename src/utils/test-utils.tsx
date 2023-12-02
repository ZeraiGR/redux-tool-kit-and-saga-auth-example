import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import {
    createStoreFactory,
    type AppStore,
    type RootState,
} from '../redux/main'
import { MemoryRouter } from 'react-router-dom'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    route?: string
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        route = '/',
        store = createStoreFactory(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren): JSX.Element {
        return (
            <MemoryRouter initialEntries={[route]}>
                <Provider store={store}>{children}</Provider>
            </MemoryRouter>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

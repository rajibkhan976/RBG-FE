import React from 'react';
import { render } from '@testing-library/react';
import PackageSetup from "../PackageSetup";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';



describe('Test package setup', () => {
    const initialState = { user: { data : 10 } };
    const mockStore = configureStore();
    let store;


    test('test package create', () => {
        store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <PackageSetup />
            </Provider>
        );

    });

})
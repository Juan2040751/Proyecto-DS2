/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import NavbarApp from '../src/components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe("pruebas interfaz de navbar", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <NavbarApp />
            </BrowserRouter>);
    })

    test("Titulo de la pagina presente", () => {
        expect(screen.getByText("Turbo")).toBeInTheDocument();
    });

});
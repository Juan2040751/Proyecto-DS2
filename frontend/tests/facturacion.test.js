/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import Facturacion from "../src/facturacion";

describe("pruebas interfaz de facturacion", () => {
    beforeEach(() => {
        render(<Facturacion />);
    });
    test("Titulo de la pagina presente", () => {
        expect(screen.getAllByText("Crear Factura")[0]).toBeInTheDocument();
    });
    test("Informacion del vendendor y cliente presente", () => {
        expect(screen.getByText("Vendedor")).toBeInTheDocument();
        const [seller, client] = screen.getAllByLabelText("Cedula")
        fireEvent.change(seller, { target: { value: "123" } });
        expect(seller.value).toBe("123");

        fireEvent.change(client, { target: { value: "456" } });
        expect(client.value).toBe("456");
    })

    test("Boton para añadir productos funciona", () => {
        fireEvent.change(screen.getByLabelText("Id Producto"), { target: { value: "001" } });
        fireEvent.change(screen.getByLabelText("Cantidad a vender"), { target: { value: "12" } });

        fireEvent.change(screen.getByLabelText("Id Producto"), { target: { value: "" } });
        fireEvent.change(screen.getByLabelText("Cantidad a vender"), { target: { value: "123" } });
    });
});
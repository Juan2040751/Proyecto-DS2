/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import Facturacion from "../src/facturacion";

describe("pruebas interfaz de facturacion", () => {
    let axiosMock;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        render(<Facturacion />);
    });

    afterEach(() => {
        axiosMock.restore();
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
    test("Crear factura hace la solicitud POST correctamente", async () => {
        fireEvent.change(screen.getByLabelText("Id Producto"), {
            target: { value: "001" },
        });
        fireEvent.change(screen.getByLabelText("Cantidad a vender"), {
            target: { value: "12" },
        });
        fireEvent.change(screen.getAllByLabelText("Cedula")[1], {
            target: { value: "456" },
        });

        axiosMock.onPost("http://127.0.0.1:8000/invoices/").reply(200);

        fireEvent.click(screen.getAllByText("Crear Factura")[1]);

        await waitFor(() => {
            expect(axiosMock.history.post.length).toBe(1);
            expect(JSON.parse(axiosMock.history.post[0].data)).toEqual({
                cliente: "456",
                productos: [],
                vendedor: "0",
            });
        });


        expect(screen.queryAllByRole("row")).toHaveLength(1);
    });
    test("Añadir producto actualiza la lista de productos correctamente", () => {

        fireEvent.change(screen.getByLabelText("Id Producto"), {
            target: { value: "001" },
        });
        fireEvent.change(screen.getByLabelText("Cantidad a vender"), {
            target: { value: "12" },
        });

        fireEvent.click(screen.getByText("Añadir"));

        expect(screen.getAllByRole("row")).toHaveLength(1);
        expect(screen.getAllByRole("cell")).toHaveLength(6);
    });
});

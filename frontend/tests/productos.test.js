/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from '../src/api/products.api';
import { ProductCard } from '../src/components/ProductCard';
import ListProducts from '../src/components/list_products';
import Productos from "../src/productos";
describe("pruebas interfaz de productos", () => {

    beforeEach(() => {
        render(<BrowserRouter><Productos /></BrowserRouter>)
    })
    test("Titulo de la pagina presente", () => {
        expect(screen.getByText("Lista de Productos")).toBeInTheDocument();
    });
    test("Boton para añadir productos presente", () => {
        expect(screen.getByRole("button", { name: "Agregar Producto" })).toBeInTheDocument();
    });
    test("Boton para añadir productos funciona", () => {
        const button = screen.getByText("Agregar Producto");
        fireEvent.click(button);
        expect(screen.getByText("Nuevo Producto")).toBeInTheDocument();
    });
    test("Formulario para añadir productos presente", () => {
        fireEvent.click(screen.getByText("Agregar Producto"));
        expect(screen.getByText("Nuevo Producto")).toBeInTheDocument();
        expect(screen.getByLabelText("Nombre del Producto")).toBeInTheDocument();
        expect(screen.getByLabelText("Precio del Producto")).toBeInTheDocument();
        expect(screen.getByLabelText("Unidades del Producto")).toBeInTheDocument();
        expect(screen.getByLabelText("Descripción del Producto")).toBeInTheDocument();
        expect(screen.getByLabelText("Fabricante del Producto")).toBeInTheDocument();
        expect(screen.getByLabelText("Nombre del Producto").value).toBe("");
        expect(screen.getByLabelText("Precio del Producto").value).toBe("0");
        expect(screen.getByLabelText("Unidades del Producto").value).toBe("");
        expect(screen.getByLabelText("Descripción del Producto").value).toBe("");
        expect(screen.getByLabelText("Fabricante del Producto").value).toBe("");
    });
    test("Boton para añadir un producto funciona", async () => {
        fireEvent.click(screen.getByText("Agregar Producto"));
        const server = setupServer(
            rest.post("'https://tienda-service.onrender.com/products/", (req, res, ctx) => {
                console.log(res)
                return res(
                    ctx.status(200),
                    ctx.json({ message: "producto añadido con éxito!" })

                );
            })
        );
        fireEvent.change(screen.getByLabelText("Nombre del Producto"), { target: { value: "Producto de prueba" } });
        fireEvent.change(screen.getByLabelText("Precio del Producto"), { target: { value: "100" } });
        fireEvent.change(screen.getByLabelText("Unidades del Producto"), { target: { value: "10" } });
        fireEvent.change(screen.getByLabelText("Descripción del Producto"), { target: { value: "Descripcion de prueba" } });
        fireEvent.change(screen.getByLabelText("Fabricante del Producto"), { target: { value: "Fabricante de prueba" } });
        fireEvent.change(screen.getByLabelText("Categoria del Producto"), { target: { value: "Categoria de prueba" } });
        fireEvent.change(screen.getByRole("textbox", { name: /weight/i }), { target: { value: "100" } });
        fireEvent.click(screen.getByRole("button", { name: "Crear" }));
    });

    test("Se puede editar el fabricante de un producto", async () => {
        fireEvent.click(screen.getByText("Agregar Producto"));
        fireEvent.change(screen.getByLabelText("Fabricante del Producto"), { target: { value: "Fabricante de prueba" } });
        fireEvent.click(screen.getByRole("button", { name: "Crear" }));
        const server = setupServer(
            rest.post("'https://tienda-service.onrender.com/products/", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({ message: "producto añadido con éxito!" })
                );
            })
        );
        server.listen();
        const jsdomAlert = window.alert;
        window.alert = () => { };
        //const alert = await screen.findByText(new RegExp("error!", "i"));
        //expect(alert).toBeInTheDocument();
        server.resetHandlers()
        server.close()
    });
});


jest.mock('../src/api/products.api', () => ({
    getAllProducts: jest.fn(),
    deleteProduct: jest.fn(),
}));

describe('Pruebas interfaz listProducts', () => {
    test('Muestra correctamente la lista de productos', async () => {
        const productsMock = [
            {
                id: 1,
                name: 'Producto 1',
                description: 'Descripción del producto 1',
                price: 10.99,
                manufacturer: 'Fabricante 1',
                weight: '1 kg',
                category: 'Categoría 1',
                numberUnits: 5,
            }
        ];
        getAllProducts.mockResolvedValueOnce({ data: productsMock });

        render(<BrowserRouter><ListProducts /></BrowserRouter>);
        let axiosMock;
        axiosMock = new MockAdapter(axios);
        axiosMock.onDelete("'https://tienda-service.onrender.com/products/1").reply(200);
        axiosMock.onPut("https://tienda-service.onrender.com/products/1").reply(200);
        await waitFor(() => {
            productsMock.forEach((product) => {
                expect(screen.getByText(product.name)).toBeInTheDocument();
                fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);
                fireEvent.click(screen.getAllByRole("button", { name: "Actualizar" })[0]);
            });
        });

    });

});








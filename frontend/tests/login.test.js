/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../src/login';
import { BrowserRouter } from 'react-router-dom';

describe('Pruebas interfaz Login', () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    render(<BrowserRouter><Login /></BrowserRouter>);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  test('Titulo de la página presente', () => {  
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('Login hace la solicitud POST correctamente', async () => {


    axiosMock.onPost('https://tienda-service.onrender.com/users/login', { username: 'Juan Jose', password: '1234' }).reply(200, {
      message: 'Login successful',
      id: '1',
      username: 'Juan Jose',
    });

    const usernameInput = screen.getByLabelText('Nombre de Usuario:');
    const passwordInput = screen.getByLabelText('Contraseña:');
    const submitButton = screen.getByRole('button', { name: 'Ingresar' });

    fireEvent.change(usernameInput, { target: { value: 'Juan Jose' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1);
      expect(axiosMock.history.post[0].url).toBe('https://tienda-service.onrender.com/users/login');
      expect(JSON.parse(axiosMock.history.post[0].data)).toEqual({ username: 'Juan Jose', password: '1234' });
    });
  });
});
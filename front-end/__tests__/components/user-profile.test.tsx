import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from '../../src/components/UserProfile';

const userId = "123";
describe('UserProfile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should displays user', async () => {
    const mockUser = { name: "John Doe", email: "john.doe@example.com" };

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      })
    ) as jest.Mock;

    await act(async () => {
      render(<UserProfile userId={userId} />);
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(
        screen.getByText("Email: john.doe@example.com")
      ).toBeInTheDocument();
    });
  });

  test('should renders Loading when user is null', async () => {
    await act(async () => {
      render(<UserProfile userId={userId} />);
    });
    await(() =>
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    );
  })

  test('should renders error message when there is an error', async () => {
    // Mock the fetch API to return an error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        headers: new Headers(),
        redirected: false,
        statusText: 'Internal Server Error',
        type: 'basic',
        url: 'https://example.com/api/user/1',
        json: () => Promise.resolve({
          message: 'Internal Server Error',
        }),
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        bytes: jest.fn(),
      })
    );

    await act(async () => {
      render(<UserProfile userId={userId} />);
    });
    await waitFor(() =>
      expect(
        screen.getByText(/Error: Failed to fetch user data/i)
      ).toBeInTheDocument()
    );
  });
});


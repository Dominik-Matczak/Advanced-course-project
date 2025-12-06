import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

let capturedDefaultValues = {};

const MOCK_USER_DATA = {
  name: { firstname: 'Dominik', lastname: 'Matczak' },
  address: { street: 'Testowa 17', zipcode: '01-234', city: 'Warszawa' },
  phone: '1-234-567-8901',
};

vi.mock('react-hook-form', () => ({
  useForm: (config) => {
    capturedDefaultValues = config.defaultValues;
    return {
      trigger: vi.fn(),
      handleSubmit: (cb) => cb,
      formState: { errors: {} },
      register: vi.fn((name) => ({ name, value: config.defaultValues?.[name] })),
    };
  },
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => ({}),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return { ...actual, useDispatch: vi.fn(() => vi.fn()), useSelector: vi.fn() };
});

// ======================
// TESTY JEDNOSTKOWE
// ======================

describe('useCart Initial State & Button State', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('react-redux', async () => {
      const actual = await vi.importActual('react-redux');
      return {
        ...actual,
        useDispatch: vi.fn(() => vi.fn()),
        useSelector: () => ({
          auth: { user: MOCK_USER_DATA, cart: [] },
          orders: { orders: [] },
        }),
      };
    });
  });

  test('should initiate currentCartStage with value 1', async () => {
    const { default: useCart } = await import('./useCart');
    const { result } = renderHook(() => useCart());
    expect(result.current.currentCartStage).toBe(1);
  });

  test('should initiate isBtnDisabled with false', async () => {
    const { default: useCart } = await import('./useCart');
    const { result } = renderHook(() => useCart());
    expect(result.current.isBtnDisabled).toBe(false);
  });
});

describe('useCart form defaultValues', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('react-redux', async () => {
      const actual = await vi.importActual('react-redux');
      return {
        ...actual,
        useDispatch: vi.fn(() => vi.fn()),
        useSelector: () => ({
          auth: { user: MOCK_USER_DATA, cart: [] },
          orders: { orders: [] },
        }),
      };
    });
  });

  test('should set form default values based on Redux user data', async () => {
    const { default: useCart } = await import('./useCart');
    renderHook(() => useCart());
    waitFor(() => {
        expect(capturedDefaultValues).toEqual({
      firstname: MOCK_USER_DATA.name.firstname,
      lastname: MOCK_USER_DATA.name.lastname,
      street: MOCK_USER_DATA.address.street,
      zipcode: MOCK_USER_DATA.address.zipcode,
      city: MOCK_USER_DATA.address.city,
      phone: MOCK_USER_DATA.phone,
    });
    })
  });
});

// ======================
// TESTY INTEGRACYJNE
// ======================

describe('useCart handleProcced - empty cart', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('react-redux', async () => {
      const actual = await vi.importActual('react-redux');
      return {
        ...actual,
        useDispatch: vi.fn(() => vi.fn()),
        useSelector: () => ({
          auth: { user: MOCK_USER_DATA, cart: [] },
          orders: { orders: [] },
        }),
      };
    });
  });

  test('should not change stage when cart is empty', async () => {
    const { default: useCart } = await import('./useCart');
    const { result } = renderHook(() => useCart());
    expect(result.current.currentCartStage).toBe(1);
    result.current.handleProcced();
    expect(result.current.currentCartStage).toBe(1);
  });
});

describe('useCart handleProcced - cart has products', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('react-redux', async () => {
      const actual = await vi.importActual('react-redux');
      return {
        ...actual,
        useDispatch: vi.fn(() => vi.fn()),
        useSelector: () => ({
          auth: { user: MOCK_USER_DATA, cart: [{ id: 1, name: 'Product A' }] },
          orders: { orders: [] },
        }),
      };
    });
  });

  test('should increase stage to 2', async () => {
    const { default: useCart } = await import('./useCart');
    const { result } = renderHook(() => useCart());
    expect(result.current.currentCartStage).toBe(1);
    result.current.handleProcced();
    waitFor(() => {
        expect(result.current.currentCartStage).toBe(2);
    })
  });
});

describe('useCart handleReturn logic', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('react-redux', async () => {
      const actual = await vi.importActual('react-redux');
      return {
        ...actual,
        useDispatch: vi.fn(() => vi.fn()),
        useSelector: () => ({
          auth: { user: MOCK_USER_DATA, cart: [{ id: 1, name: 'Product A' }] },
          orders: { orders: [] },
        }),
      };
    });
  });

  test('should decrease stage from 2 → 1', async () => {
    const { default: useCart } = await import('./useCart');
    const { result } = renderHook(() => useCart());

    result.current.handleProcced();

    await waitFor(() => {
      expect(result.current.currentCartStage).toBe(2);
    });

    result.current.handleReturn();

    await waitFor(() => {
      expect(result.current.currentCartStage).toBe(1);
    });
  });

  test('should NOT decrease below 1', async () => {
    const { default: useCart } = await import('./useCart');
    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(result.current.currentCartStage).toBe(1);
    });

    result.current.handleReturn();

    await waitFor(() => {
      expect(result.current.currentCartStage).toBe(1);
    });
  });
});
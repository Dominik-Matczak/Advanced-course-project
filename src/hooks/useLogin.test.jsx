import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useLogin from './useLogin';
import * as redux from 'react-redux';
import * as reactHookForm from 'react-hook-form';
import { loginUser } from '../slices/authSlice';

vi.mock('react-redux');
vi.mock('react-hook-form');
vi.mock('@hookform/resolvers/zod');
vi.mock('../slices/authSlice', () => ({
  loginUser: vi.fn((data) => ({ type: 'loginUser', payload: data })),
}));

const useDispatchMocked = vi.mocked(redux.useDispatch);
const useFormMocked = vi.mocked(reactHookForm.useForm);

describe('useLogin hook', () => {
  let dispatchMock;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock = vi.fn();
    useDispatchMocked.mockReturnValue(dispatchMock);

    useFormMocked.mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn(cb => cb),
      formState: { errors: {} },
    });
  });

  test('should return register, handleSubmit, errors, onSubmit, dispatch', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.errors).toBeDefined();
    expect(result.current.onSubmit).toBeDefined();
    expect(result.current.dispatch).toBeDefined();
  });

  test('onSubmit should call dispatch with loginUser', () => {
    const { result } = renderHook(() => useLogin());
    const mockUser = { username: 'Dominik', password: '123456' };

    result.current.onSubmit(mockUser);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(loginUser(mockUser));
  });
});

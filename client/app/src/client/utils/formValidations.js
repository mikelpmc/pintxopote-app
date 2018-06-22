export const required = value => (value ? undefined : 'Campo requerido');

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Email no válido'
        : undefined;

export const minLength = min => value =>
    value && value.length < min
        ? `Debe tener un mínimo de ${min} caracteres`
        : undefined;

export const minValue = min => value =>
    value && value < min ? `Debe tener un valor mínimo de ${min}` : undefined;

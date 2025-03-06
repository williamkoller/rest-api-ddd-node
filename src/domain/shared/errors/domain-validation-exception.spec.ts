import { DomainValidationException } from './domain-validation-exception';
import { HttpStatus } from '@nestjs/common';

describe(DomainValidationException.name, () => {
  it('should create an exception with the default message and status', () => {
    const exception = new DomainValidationException();

    expect(exception.getResponse()).toBe('Domain validation exception');
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);

    expect(exception.message).toBe('Domain validation exception');
  });

  it('should create an exception with a custom message', () => {
    const customMessage = 'Custom validation error';
    const exception = new DomainValidationException(customMessage);

    expect(exception.getResponse()).toBe(customMessage);
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);

    expect(exception.message).toBe(customMessage);
  });

  it('should correctly set the response object', () => {
    const exception = new DomainValidationException('Test message');

    expect(exception.getResponse()).toBe('Test message');
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  });
});

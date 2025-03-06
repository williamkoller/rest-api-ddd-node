import { CommonValidation } from './common-validation';
import { BadRequestException } from '@nestjs/common';

describe(CommonValidation.name, () => {
  it('validateWebURL should return true for valid URLs', () => {
    expect(CommonValidation.validateWebURL('https://google.com')).toBe(true);
    expect(CommonValidation.validateWebURL('http://example.org')).toBe(true);
  });

  it('validateWebURL should return false for invalid URLs', () => {
    expect(CommonValidation.validateWebURL('invalid-url')).toBe(false);
    expect(CommonValidation.validateWebURL('http:/invalid.com')).toBe(false);
  });

  it('validateEmailAddress should return true for valid emails', () => {
    expect(CommonValidation.validateEmailAddress('test@example.com')).toBe(
      true,
    );
    expect(CommonValidation.validateEmailAddress('user.name@domain.co')).toBe(
      true,
    );
  });

  it('validateEmailAddress should return false for invalid emails', () => {
    expect(CommonValidation.validateEmailAddress('invalid-email')).toBe(false);
    expect(CommonValidation.validateEmailAddress('user@domain')).toBe(false);
  });

  it('isValidCNPJ should return true for valid CNPJs', () => {
    expect(CommonValidation.isValidCNPJ('12.345.678/0001-95')).toBe(true);
    expect(CommonValidation.isValidCNPJ('12345678000195')).toBe(true);
  });

  it('isValidCNPJ should return false for invalid CNPJs', () => {
    expect(CommonValidation.isValidCNPJ('12.345.678/0001-00')).toBe(false);
    expect(CommonValidation.isValidCNPJ('00000000000000')).toBe(false);
  });

  it('isValidCPF should return true for valid CPFs', () => {
    expect(CommonValidation.isValidCPF('123.456.789-09')).toBe(false);
    expect(CommonValidation.isValidCPF('12345678909')).toBe(false);
  });

  it('isValidCPF should return false for invalid CPFs', () => {
    expect(CommonValidation.isValidCPF('123.456.789-00')).toBe(false);
    expect(CommonValidation.isValidCPF('00000000000')).toBe(false);
  });

  it('getEnumValue should return valid enum value', () => {
    enum TestEnum {
      VALUE1 = 'value1',
      VALUE2 = 'value2',
    }
    expect(CommonValidation.getEnumValue(TestEnum, 'TestEnum', 'value1')).toBe(
      TestEnum.VALUE1,
    );
  });

  it('getEnumValue should throw error for invalid enum value', () => {
    enum TestEnum {
      VALUE1 = 'value1',
      VALUE2 = 'value2',
    }
    expect(() =>
      CommonValidation.getEnumValue(TestEnum, 'TestEnum', 'invalid'),
    ).toThrow(BadRequestException);
  });
});

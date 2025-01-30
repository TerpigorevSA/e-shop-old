import { createAccountService } from 'src/shared/services/AccountService';
import { ProductType, UserType } from 'src/shared/types/accountService';

describe('AccountService', () => {
  let db: any;
  let service: any;

  beforeEach(() => {
    db = {
      discounts: {
        [UserType.Standard]: { general: 0, productSpecific: {} },
        [UserType.Premium]: { general: 0, productSpecific: {} },
        [UserType.Gold]: { general: 0, productSpecific: {} },
        [UserType.Free]: { general: 0, productSpecific: {} },
      },
    };
    service = createAccountService(db);
  });

  describe('Общие скидки', () => {
    it('устанавливает и возвращает общую скидку для типа пользователя', () => {
      service.setGeneralDiscount(UserType.Premium, 20);
      expect(service.getFinalDiscount(UserType.Premium, ProductType.Car)).toBe(20);
    });

    it('выбрасывает ошибку для некорректной общей скидки', () => {
      expect(() => service.setGeneralDiscount(UserType.Gold, 110)).toThrow('Скидка должна быть в пределах от 0 до 100');
    });
  });

  describe('Скидки на товары', () => {
    it('устанавливает и возвращает скидку на конкретный товар', () => {
      service.setProductDiscount(UserType.Standard, ProductType.Toy, 15);
      expect(service.getFinalDiscount(UserType.Standard, ProductType.Toy)).toBe(15);
    });

    it('выбрасывает ошибку для некорректной скидки на товар', () => {
      expect(() => service.setProductDiscount(UserType.Free, ProductType.Food, -10)).toThrow(
        'Скидка должна быть в пределах от 0 до 100'
      );
    });
  });

  describe('Расчет итоговой скидки', () => {
    it('суммирует общую и товарную скидки', () => {
      service.setGeneralDiscount(UserType.Gold, 30);
      service.setProductDiscount(UserType.Gold, ProductType.Car, 20);
      expect(service.getFinalDiscount(UserType.Gold, ProductType.Car)).toBe(50);
    });

    it('ограничивает итоговую скидку максимумом 100%', () => {
      service.setGeneralDiscount(UserType.Premium, 70);
      service.setProductDiscount(UserType.Premium, ProductType.Toy, 50);
      expect(service.getFinalDiscount(UserType.Premium, ProductType.Toy)).toBe(100);
    });
  });
});

import LivrError from './index';

describe('Error - Index', () => {
  const error = new LivrError();

  it('should call clearErrors just once', () => {
    const spy = jest.spyOn(error, 'clearErrors');
    error.clearErrors({
      pricingInfos: '',
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('should call clearErrors 3 times and then call clearError', () => {
    const clearErrorsSpy = jest.spyOn(error, 'clearErrors');
    const clearErrorSpy = jest.spyOn(error, 'clearError');

    error.clearErrors({
      pricingInfos: {
        price: {
          anotherKey: '',
        },
      },
    });

    expect(clearErrorsSpy).toHaveBeenCalledTimes(3);
    expect(clearErrorSpy).toHaveBeenCalledTimes(1);
    expect(clearErrorSpy).toHaveBeenCalledWith('anotherKey');

    clearErrorsSpy.mockRestore();
    clearErrorSpy.mockRestore();
  });
});

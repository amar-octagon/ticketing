<<<<<<< HEAD
export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
=======
export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => {
      callback();
    }),
  },
};
>>>>>>> 9e80ec38869d84def7dd15bd1cd674018ce4b4b4

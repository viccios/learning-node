import process from 'node:process';

export const SECRET_KEY =
  process.env.SECRET_KEY ||
  '993a21c068d120a2d5fb2a85961ba866c4cce2fbf54ab0492f861b2b2f1dbc74';
export const PORT = process.env.PORT || 3000;

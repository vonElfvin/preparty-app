export const enum FeedbackMessage {
  Custom,
  DefaultError = 'Något gick fel.',
  Login = 'Du är nu inloggad.',
  ErrorLogin = 'Kunde inte logga in, vänligen försök igen.',
  Admin = 'Enbart admin har tillgång till den sidan.',
}

export const enum FeedbackType {
  Error = 'errorSnackbar',
  Primary = 'primarySnackbar',
  Accent = 'accentSnackbar'
}

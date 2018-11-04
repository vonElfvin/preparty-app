export const enum FeedbackMessage {
  Custom,
  DefaultError = 'Something went wrong',
  Login = 'You\'re logged in',
  ErrorLogin = 'Coundn\'t log in, please try again',
  Admin = 'Only admin has access to this page',
  QuestionSuccess = 'Question added!',
  QuestionError = 'Something went wrong when adding the question',
  JoinCodeError = 'No game exists with that join code.',
  JoinCodeSuccess = 'Joined game.'
}

export const enum FeedbackType {
  Error = 'errorSnackbar',
  Primary = 'primarySnackbar',
  Accent = 'accentSnackbar'
}

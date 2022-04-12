import { all } from 'redux-saga/effects';
import { watchCards } from './cards/actions';

export default function* rootSaga() {
  yield all([
    watchCards(),
  ]);
}

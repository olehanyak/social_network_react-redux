import usersReducer, { actions, InitialStateType } from './usersReducer';

let state: InitialStateType;
beforeEach(() => {
  state = {
    users: [
      { id: 0, name: 'Alex', followed: false, photos: { small: undefined, large: undefined, }, status: '0' },
      { id: 1, name: 'Jack', followed: false, photos: { small: undefined, large: undefined, }, status: '1' },
      { id: 2, name: 'Bob', followed: true, photos: { small: undefined, large: undefined, }, status: '2' },
      { id: 3, name: 'Mark', followed: true, photos: { small: undefined, large: undefined, }, status: '3' },
    ],
    totalPages: 0,
    currentPage: 1,
    sizePage: 10,
    isFetching: false,
    followingProgress: [],
  }
})

test('success follow', () => {

  const newState = usersReducer(state, actions.follow(2))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[2].followed).toBeTruthy()
})

test('success unFollow', () => {

  const newState = usersReducer(state, actions.unFollow(3))

  expect(newState.users[3].followed).toBeTruthy()
  expect(newState.users[1].followed).toBeFalsy()
})
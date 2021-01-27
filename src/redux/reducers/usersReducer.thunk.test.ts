
import { actions, followUsers, unFollowUsers } from "./usersReducer";
import { dataAPI } from "../../api/users-api";
import { APIResponseType, ResultCodeEnum } from "../../api/api";

jest.mock("../../api/users-api")
const userAPIMock = dataAPI as jest.Mocked<typeof dataAPI>;

const result: APIResponseType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {},
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  userAPIMock.followUser.mockClear()
  userAPIMock.unFollowUser.mockClear()
})

userAPIMock.followUser.mockReturnValue(Promise.resolve(result))
userAPIMock.unFollowUser.mockReturnValue(Promise.resolve(result))

test('follow thunk success', async () => {
  const thunk = followUsers(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(true, 1))
})

test('unFollow thunk success', async () => {
  const thunk = unFollowUsers(1)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollow(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(true, 1))
})
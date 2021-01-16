const API_BASE_URL = 'http://api.sportradar.us'
const API_ADMIN_URL = 'http://4039a03a4870.ngrok.io'

let fetechSchedule: nkruntime.RpcFunction = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string,
): string {
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  let json = JSON.parse(payload)

  logger.info(ctx.userId)
  logger.info(json.date)

  //   logger.debug('user_id: %s, payload: %q', ctx.userId, json)
  let response = nk.httpRequest(
    API_BASE_URL +
      '/nhl/trial/v7/en/games/2020/REG/schedule.json?api_key=nbqpwfg6z6kv4xezfnb46dnu', // schedule
    // `/nhl/trial/v7/en/games/${json.date}/schedule.json?api_key=nbqpwfg6z6kv4xezfnb46dnu`, // daily schedule
    'get',
    headers,
    '',
  )

  return response.body
}

let fetechGames: nkruntime.RpcFunction = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string,
): string {
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  logger.info(payload)

  let response = nk.httpRequest(
    API_ADMIN_URL + '/api/games',
    'get',
    headers,
    '',
  )
  logger.debug('Hello World!2')

  return response.body
}

let InitModule: nkruntime.InitModule = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  initializer: nkruntime.Initializer,
) {
  let functions = ['schedule', 'user/friend', 'users/{user}']

  functions.forEach((func) => initializer.registerRpc(func, fetechSchedule))
  // initializer.registerRpc('schedule', fetechSchedule)
  initializer.registerRpc('games', fetechGames)
}

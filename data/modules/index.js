"use strict";
var API_BASE_URL = 'http://api.sportradar.us';
var API_ADMIN_URL = 'http://1b490b262c6d.ngrok.io';
var fetechSchedule = function (ctx, logger, nk, payload) {
    var headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    var json = JSON.parse(payload);
    logger.info('userId: %s, payload: $q', ctx.userId, json);
    logger.info(json.date);
    var response = nk.httpRequest(API_BASE_URL +
        '/nhl/trial/v7/en/games/2020/REG/schedule.json?api_key=nbqpwfg6z6kv4xezfnb46dnu', // schedule
    // `/nhl/trial/v7/en/games/${json.date}/schedule.json?api_key=nbqpwfg6z6kv4xezfnb46dnu`, // daily schedule
    'get', headers, '');
    return response.body;
};
var fetechGames = function (ctx, logger, nk, payload) {
    var headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    // let json = JSON.parse(payload)
    // logger.info('userId: %s, payload: $q', ctx.userId, json)
    // logger.info('userId: %s, payload: $q', ctx.userId, json)
    var response = nk.httpRequest(API_ADMIN_URL + '/api/games', 'get', headers, payload);
    return response.body;
};
var InitModule = function (ctx, logger, nk, initializer) {
    // `/users/{user}` should be converted `/users` with payload { user: userId }
    // functions.forEach((func) => initializer.registerRpc(func, fetechSchedule))
    // initializer.registerRpc('schedule', fetechSchedule)
    initializer.registerRpc('games', fetechGames);
};

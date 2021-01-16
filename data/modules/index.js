"use strict";
var API_BASE_URL = 'http://api.sportradar.us';
var API_ADMIN_URL = 'http://4039a03a4870.ngrok.io';
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
    var json = JSON.parse(payload);
    logger.info('userId: %s, payload: $q', ctx.userId, json);
    logger.info(json.date);
    var response = nk.httpRequest(API_ADMIN_URL + '/api/games', 'get', headers, '');
    logger.debug('Hello World!2');
    return response.body;
};
var InitModule = function (ctx, logger, nk, initializer) {
    var functions = ['schedule', 'user/friend', 'users/{user}'];
    functions.forEach(function (func) { return initializer.registerRpc(func, fetechSchedule); });
    // initializer.registerRpc('schedule', fetechSchedule)
    initializer.registerRpc('games', fetechGames);
};

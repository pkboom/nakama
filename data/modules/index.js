"use strict";
var API_BASE_URL = 'http://api.sportradar.us';
// const API_ADMIN_URL = 'http://04054e4e2a6e.ngrok.io/api'
var API_ADMIN_URL = 'http://3.96.66.61/api';
var headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};
var fetechSchedule = function (ctx, logger, nk, payload) {
    var headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    var response = nk.httpRequest(API_BASE_URL +
        '/nhl/trial/v7/en/games/2020/REG/schedule.json?api_key=nbqpwfg6z6kv4xezfnb46dnu', // schedule
    // `/nhl/trial/v7/en/games/${json.date}/schedule.json?api_key=nbqpwfg6z6kv4xezfnb46dnu`, // daily schedule
    'get', headers, '');
    return response.body;
};
var fetechGames = function (ctx, logger, nk, payload) {
    // logger.info('payload: %q', json)
    logger.info('context: %q', ctx);
    logger.info('payload: %q', payload);
    return nk.httpRequest(API_ADMIN_URL + '/games', 'get', headers, payload).body;
};
var fetechGame = function (ctx, logger, nk, payload) {
    var json = JSON.parse(payload);
    // logger.info(json.id)
    return nk.httpRequest(API_ADMIN_URL + ("/games/" + json.id), 'get', headers, '')
        .body;
};
var InitModule = function (ctx, logger, nk, initializer) {
    // `/users/{user}` should be converted `/users` with payload { user: userId }
    // functions.forEach((func) => initializer.registerRpc(func, fetechSchedule))
    // initializer.registerRpc('schedule', fetechSchedule)
    initializer.registerRpc('games', fetechGames);
    initializer.registerRpc('game-detail', fetechGame);
};

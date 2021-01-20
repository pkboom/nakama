local nk = require("nakama")

local M = {}

local API_BASE_URL = "http://api.sportradar.us"

function M.fetch_games(date)
  local url = string.format("%s/nba/trial/v7/en/games/%s/schedule.json?api_key=xu6cdvtaszrbkme87jgt8jjv", API_BASE_URL, date)
  local method = "GET"
  local headers = {
    ["Content-Type"] = "application/json",
    ["Accept"] = "application/json"
  }
  local success, code, _, body = pcall(nk.http_request, url, method, headers, nil)
  if (not success) then
    nk.logger_error(string.format("Failed request %q", code))
    error(code)
  elseif (code >= 400) then
    nk.logger_error(string.format("Failed request %q %q", code, body))
    error(body)
  else
    return body
  end
end

return M

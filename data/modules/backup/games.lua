local nk = require("nakama")
local sp_api = require("sports_radar")

nk.logger_info("Sport Bingo Cards module loaded!")

local function get_games(context, payload)
  local json = nk.json_decode(payload)

  local success, result = pcall(sp_api.fetch_games, json.date)
  if (not success) then
    error("Unable to lookup games.")
  else
    return result
  end
end

nk.register_rpc(get_games, "games")

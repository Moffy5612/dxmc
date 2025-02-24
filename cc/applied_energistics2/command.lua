local args={...}
local meBridge = peripheral.wrap("bottom")
local data = require("dataManager") 

local relayComputerId = 1

function send(table):
    rednet.send(relayComputerId, textutils.serialiseJSON(table), "master")
end

function getItemList():
    return meBridge.meBridge.listItems()
end

if args[1] == "getAll" then
    local data = {
        items = getItemList()
    }
    send(data)
end
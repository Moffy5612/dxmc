local meBridge = peripheral.wrap("bottom")

local duration = 1
local relayComputerId = 1

while true do

    local d = {
        items = meBridge.listItems()
    }

    for k, v in pairs(d) do
        data.set_value(k, v)
    end

    local tab = data.get_all()
    rednet.send(relayComputerId, textutils.serialiseJSON(tab), "master")

    os.sleep(duration)
end
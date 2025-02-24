local meBridge = peripheral.wrap("bottom")


data.set_value("logs",{})

local duration = 0.2
local relayComputerId = 0

local itemList = {}
local lp = 1

while true do
    if lp == 0 then
        itemList = meBridge.listItems()
    end
    lp = lp % 65536 + 1

    local itemIndex = lp % #itemList + 1
    local d = {
        item = itemList[itemIndex] 
    }

    for k, v in pairs(d) do
        data.set_value(k, v)
    end

    local tab = data.get_all()
    rednet.send(relayComputerId, textutils.serialiseJSON(tab), "master")

    os.sleep(duration)
end
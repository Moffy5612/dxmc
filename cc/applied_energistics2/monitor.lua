local meBridge = peripheral.wrap("bottom")

local duration = 1
local relayComputerId = 1

function to_serial_list(tbl)
    local list = {}
    for _, v in pairs(tbl) do
        list [#list + 1] = textutils.serialiseJSON(tbl)
    end
end

while true do

    local d = {
        items = to_serial_list(meBridge.listItems())
    }

    for k, v in pairs(d) do
        data.set_value(k, v)
    end

    local tab = data.get_all()
    rednet.send(relayComputerId, textutils.serialiseJSON(tab), "master")

    os.sleep(duration)
end
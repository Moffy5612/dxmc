rednet.open("top")

local ws = assert(http.websocket("ws://localhost:56121"))

multishell.launch({ws=ws},"/send.lua")
multishell.launch({ws=ws},"/receive.lua")

while true do
    id, msg = rednet.receive("cmd")

    local data = textutils.unserialise(msg)
    print(textutils.serialise(data))
    if data["id"] then
        if data["id"] == os.getComputerID() then
            if data["data"] == "reboot" then
                rednet.broadcast("reboot", "system")
            end
        else
            rednet.send(data["id"], data["data"], "master")
        end
    end
end
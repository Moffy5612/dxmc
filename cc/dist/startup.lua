local data = require("data")

rednet.open("top")

multishell.launch({data = data}, "/monitor.lua")
multishell.launch({},"/system.lua")

while true do
    id, msg = rednet.receive("master")
    data.add_log("sent cmd > " .. msg)
    local b, err = shell.run("./command.lua " .. msg)
    if b then data.add_log("request successfully finished.")
    else data.add_log(err) end
end
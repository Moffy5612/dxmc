shell.run("rm /*")

shell.run("wget https://raw.githubusercontent.com/Moffy5612/dxmc/refs/heads/main/cc/dist/system.lua")
shell.run("wget https://raw.githubusercontent.com/Moffy5612/dxmc/refs/heads/main/cc/dist/startup.lua")
shell.run("wget https://raw.githubusercontent.com/Moffy5612/dxmc/refs/heads/main/cc/dist/dataManager.lua")
shell.run("wget https://raw.githubusercontent.com/Moffy5612/dxmc/refs/heads/main/cc/dist/data.json")

shell.run("wget https://raw.githubusercontent.com/Moffy5612/dxmc/refs/heads/main/cc/flux_networks/monitor.lua")

shell.run("reboot")
function is_recursive_table(tbl, seen)
    if type(tbl) ~= "table" then
        return false
    end

    seen = seen or {}

    if seen[tbl] then
        print(seen[tbl])
        return true
    end

    seen[tbl] = true

    for _, v in pairs(tbl) do
        if type(v) == "table" and is_recursive_table(v, seen) then
            return true
        end
    end

    seen[tbl] = nil
    return false
end

local meBridge = peripheral.wrap("bottom")
items = meBridge.listItems()
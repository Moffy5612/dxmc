function stringify(tbl)
    local function serialize(value)
        if type(value) == "string" then
            return '"' .. value:gsub('"', '\\"') .. '"'
        elseif type(value) == "number" or type(value) == "boolean" then
            return tostring(value)
        elseif type(value) == "table" then
            local is_array = true
            local index = 1
            for k, _ in pairs(value) do
                if k ~= index then
                    is_array = false
                    break
                end
                index = index + 1
            end

            local elements = {}
            if is_array then
                for _, v in ipairs(value) do
                    table.insert(elements, serialize(v))
                end
                return "[" .. table.concat(elements, ",") .. "]"
            else
                for k, v in pairs(value) do
                    if type(k) ~= "string" then
                        error("JSON object keys must be strings")
                    end
                    table.insert(elements, '"' .. k .. '":' .. serialize(v))
                end
                return "{" .. table.concat(elements, ",") .. "}"
            end
        else
            return "null"
        end
    end

    return serialize(tbl)
end

function parse(json)
    local function parse_value(str, index)
        local char = str:sub(index, index)

        if char == "{" then
            return parse_object(str, index)
        elseif char == "[" then
            return parse_array(str, index)
        elseif char == '"' then
            return parse_string(str, index)
        elseif char:match("[0-9%-]") then
            return parse_number(str, index)
        elseif str:sub(index, index + 3) == "true" then
            return true, index + 4
        elseif str:sub(index, index + 4) == "false" then
            return false, index + 5
        elseif str:sub(index, index + 3) == "null" then
            return nil, index + 4
        end
        error("Invalid JSON at position " .. index)
    end

    local function parse_string(str, index)
        local closing = index + 1
        while str:sub(closing, closing) ~= '"' or str:sub(closing - 1, closing - 1) == "\\" do
            closing = closing + 1
        end
        return str:sub(index + 1, closing - 1), closing + 1
    end

    local function parse_number(str, index)
        local match = str:match("^[%-]?%d+%.?%d*[eE]?[%+%-]?%d*", index)
        return tonumber(match), index + #match
    end

    local function parse_array(str, index)
        local array = {}
        index = index + 1
        while str:sub(index, index) ~= "]" do
            local value
            value, index = parse_value(str, index)
            table.insert(array, value)
            if str:sub(index, index) == "," then
                index = index + 1
            end
        end
        return array, index + 1
    end

    local function parse_object(str, index)
        local obj = {}
        index = index + 1
        while str:sub(index, index) ~= "}" do
            local key
            key, index = parse_string(str, index)
            index = index + 1 -- Skip ':'
            local value
            value, index = parse_value(str, index)
            obj[key] = value
            if str:sub(index, index) == "," then
                index = index + 1
            end
        end
        return obj, index + 1
    end

    local result, _ = parse_value(json, 1)
    return result
end


return {stringify=stringify, parse=parse}
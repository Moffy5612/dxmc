export const isAdmin = (roleList: string[]) => {
    return roleList.includes("Admin")
}
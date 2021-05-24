export const isOwnerOrAdminTeam = (user, team) => {
  if (
    user &&
    team &&
    ((team.owner && team.owner._id === user) ||
      (team.admins && team.admins.some((admin) => admin._id === user)))
  ) {
    return true
  } else {
    return false
  }
}

export const isOwnerOrAdminUser = (user, selectedTeam) => {
  if (
    user &&
    selectedTeam &&
    (user.owner.some((team) => team._id === selectedTeam) ||
      user.admin.some((team) => team._id === selectedTeam))
  ) {
    return true
  } else {
    return false
  }
}

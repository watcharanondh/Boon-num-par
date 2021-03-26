const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const TeamManageContrllers = require("../../controllers/teamhong/teamManagement");

/* List All Shipping */
router.get("/listallteams", authorize, TeamManageContrllers.listAllTeams);

/* List Users to CreateTeam */
router.get("/listuserstocreateteam", authorize, TeamManageContrllers.listUserstoCreateTeam);

/* Create Team */
router.post("/createteam", authorize, TeamManageContrllers.CreateTeam);

/* list Team to Edit */
router.post("/listteam", authorize, TeamManageContrllers.listTeamToEdit);

/* Edit Team */
router.post("/editteam", authorize, TeamManageContrllers.editTeam);

/* Delete Team */
router.post("/delteam", authorize, TeamManageContrllers.deleteTeam);

module.exports = router;

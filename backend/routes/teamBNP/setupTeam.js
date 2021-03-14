const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const setupTeamContrllers = require("../../controllers/teamBNP/setupTeam");

/* List All SetupTeam */
router.post("/listallsetupteam", authorize, setupTeamContrllers.listAllSetupTeam);

/* Manage task */
router.post("/managetask", authorize, setupTeamContrllers.manageTeamTask);

/* Create Checklist for Setupteam */
router.post("/createchecklistsetup", authorize, setupTeamContrllers.createChecklistSetup);
/* list Checklist to Edit Setupteam */
router.post("/listchecklistsetup", authorize, setupTeamContrllers.listChecklistToEdit);
/* Edit Checklist of Setupteam */
router.post("/editchecklistsetup", authorize, setupTeamContrllers.editChecklistSetup);
/* Delete Checklist of Setupteam */
router.post("/delchecklistsetup", authorize, setupTeamContrllers.deleteChecklistSetup);
/* Update Checklist of Setupteam */
router.post("/updatechecklistsetup", authorize, setupTeamContrllers.updateChecklistSetup);
/* Update Checklist of Setupteam (Returned) */
router.post("/updatereturnchecklistsetup", authorize, setupTeamContrllers.updateChecklistSetupReturn);

/* Create Image Setup */
router.post("/createimgsetup", authorize, setupTeamContrllers.createImageSetup);
/* Delete Image Setup */
router.post("/delimgsetup", authorize, setupTeamContrllers.deleteImageSetup);

module.exports = router;

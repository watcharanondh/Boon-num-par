const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const lineupFoodTeamContrllers = require("../../controllers/teamhong/lineupFoodTeam");

/* List All LineUpFoodTeam */
router.post("/listalllineupfoodteam", authorize, lineupFoodTeamContrllers.listAllLineUpFoodTeam);

/* Manage task */
router.post("/managetask", authorize, lineupFoodTeamContrllers.manageLineUpFoodTeamTask);

/* Create Checklist for LineUpFoodTeam */
router.post("/createchecklistlineupfood", authorize, lineupFoodTeamContrllers.createChecklistLineUpFood);
/* list Checklist to Edit LineUpFoodTeam */
router.post("/listchecklistlineupfood", authorize, lineupFoodTeamContrllers.listChecklistToEdit);
/* Edit Checklist of LineUpFoodTeam */
router.post("/editchecklistlineupfood", authorize, lineupFoodTeamContrllers.editChecklistLineUpFood);
/* Delete Checklist of LineUpFoodTeam */
router.post("/delchecklistlineupfood", authorize, lineupFoodTeamContrllers.deleteChecklistLineUpFood);
/* Update Checklist of LineUpFoodTeam */
router.post("/updatechecklistlineupfood", authorize, lineupFoodTeamContrllers.updateChecklistLineUpFood);
/* Update Checklist of LineUpFoodTeam (Returned) */
router.post("/updatereturnchecklistlineupfood", authorize, lineupFoodTeamContrllers.updateChecklistLineUpFoodReturn);

/* Update Description of LineUpFoodTeam */
router.post("/updatedestlineupfood", authorize, lineupFoodTeamContrllers.updateDescriptionLineUpFood);

/* Create Image LineUpFoodTeam */
router.post("/createimglineupfood", authorize, lineupFoodTeamContrllers.createImageLineUpFood);
/* Delete Image LineUpFoodTeam */
router.post("/delimglineupfood", authorize, lineupFoodTeamContrllers.deleteImageLineUpFood);

module.exports = router;

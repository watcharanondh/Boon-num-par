const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const surveyTeamContrllers = require("../../controllers/teamBNP/surveyTeam");

/* List All SurveyTeam */
router.get("/listallsurveyteam", authorize, surveyTeamContrllers.listAllSurveyTeam);

// /* Create Checklist */
// router.post("/createchecklist", authorize, surveyTeamContrllers.CreateChecklist);

// /* list Checklist to Edit */
// router.post("/listchecklist", authorize, surveyTeamContrllers.listChecklistToEdit);

// /* Edit Checklist */
// router.post("/editchecklist", authorize, surveyTeamContrllers.editChecklist);

// /* Delete Checklist */
// router.post("/delchecklist", authorize, surveyTeamContrllers.deleteChecklist);

module.exports = router;

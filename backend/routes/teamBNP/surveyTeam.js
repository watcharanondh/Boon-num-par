const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const surveyTeamContrllers = require("../../controllers/teamBNP/surveyTeam");

/* List All SurveyTeam */
router.post("/listallsurveyteam", authorize, surveyTeamContrllers.listAllSurveyTeam);

/* Manage task */
router.post("/managetask", authorize, surveyTeamContrllers.manageTeamTask);

/* Create Checklist for Surveyteam */
router.post("/createchecklistsurvey", authorize, surveyTeamContrllers.createChecklistSurvey);
/* list Checklist to Edit Surveyteam */
router.post("/listchecklistsurvey", authorize, surveyTeamContrllers.listChecklistToEditSurvey);
/* Edit Checklist of Surveyteam */
router.post("/editchecklistsurvey", authorize, surveyTeamContrllers.editChecklistSurvey);
/* Delete Checklist */
router.post("/delchecklistsurvey", authorize, surveyTeamContrllers.deleteChecklistSurvey);
/* Update Checklist of Surveyteam */
router.post("/updatechecklistsurvey", authorize, surveyTeamContrllers.updateChecklistSurvey);

/* Create Image Survey */
router.post("/createimgsurvey", authorize, surveyTeamContrllers.createImageSurvey);
/* Create Image Survey */
router.post("/delimgsurvey", authorize, surveyTeamContrllers.deleteImageSurvey);

module.exports = router;

const express = require("express");
const router = express.Router();
const authorize = require('../../middleware/authorize');

const checklistContrllers = require("../../controllers/teamhong/checklists");

/* List All Checklist */
router.get("/listallchecklists", authorize, checklistContrllers.listAllChecklists);

/* Create Checklist */
router.post("/createchecklist", authorize, checklistContrllers.CreateChecklist);

/* list Checklist to Edit */
router.post("/listchecklist", authorize, checklistContrllers.listChecklistToEdit);

/* Edit Checklist */
router.post("/editchecklist", authorize, checklistContrllers.editChecklist);

/* Delete Checklist */
router.post("/delchecklist", authorize, checklistContrllers.deleteChecklist);

module.exports = router;

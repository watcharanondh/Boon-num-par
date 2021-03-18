const { team_users, teams, users, user_details, positions } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const helper = require("../../helper/sku");

/* List All BNP Teams */
exports.listAllTeams = async (req, res) => {
  try {
    let count_total = 0;
    const result = await teams.findAll({
      attributes: ["team_code", "name"],
      include: [
        {
          model: team_users,
          attributes: ['id'],
          include: [
            {
              model: users,
              attributes: ['id'],
              include: [
                {
                  model: user_details,
                  attributes: ['nickname']
                },
              ],
            },
          ]
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0,
        team_type: 1
      },
      order: [["id", "DESC"]]
    }).then(teams => {
      teams.map((team) => {
        let team_str = '';
        team.team_users.map((user) => {
          let nick_name = user.user.user_detail.dataValues.nickname != null ? user.user.user_detail.dataValues.nickname + ', ' : '-, '
          team_str = team_str + nick_name
        })
        team.dataValues.team_users = team_str.substring(0, team_str.length - 2)
        count_total++;
        return team
      });
      return teams;
    });
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        total: count_total + " รายการ",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List All Users to CreateTeam */
exports.listUserstoCreateTeam = async (req, res) => {
  try {
    const result = await users.findAll({
      attributes: ['id'],
      include: [
        {
          model: user_details,
          attributes: ['id', 'user_code', 'name', 'nickname'],
          where: {
            position_id: {
              [Op.in]: ['6', '7']
            }
          }
        }
      ],
      where: {
        is_active: 1,
        is_delete: 0
      }
    }).then(users => {
      if (users && users.length > 0) {
        users.map(user => {
          user.user_detail.dataValues.nickname = user.user_detail.dataValues.nickname != null ? user.user_detail.dataValues.nickname : '-'
          user.dataValues = { ...user.user_detail.dataValues, ...user.dataValues }
          delete user.user_detail.dataValues
        })
      }
      return users
    })
    res.json({
      response: "OK",
      result: {
        teams: result
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Create Team */
exports.CreateTeam = async (req, res) => {
  try {
    const { name, tel_no, team_type,team_members } = req.body
    if (!name) {
      res.json({ response: "FAILED", result: "invalid team name." });
      return
    }
    if (!tel_no) {
      res.json({ response: "FAILED", result: "invalid telephone number." });
      return
    }
    if (!team_type) {
      res.json({ response: "FAILED", result: "invalid team_type." });
      return
    }
    if (!team_members && team_members.length == 0) {
      res.json({ response: "FAILED", result: "please choose member." });
      return
    }
    const getMaxTeamCode = await teams.findOne({ attributes: [[Sequelize.fn('MAX', Sequelize.col('team_code')), "maxTeamCode"]] })
    const newTeamCode = getMaxTeamCode.dataValues.maxTeamCode !== null ? helper.SKUincrementer(getMaxTeamCode.dataValues.maxTeamCode) : "BNPM000001";
    /*สร้าง Team*/
    const teamsResult = await teams.create({
      team_code: newTeamCode,
      name: name,
      team_type:1,
      mobile_phone_number: tel_no
    });
    /*สร้างรายการสมาชิก สำหรับทีมนั้นๆ*/
    var ObjUsers = team_members.map(user => { return { "team_id": teamsResult.dataValues.id, "user_id": user.id } });
    console.log(ObjUsers);
    teamUserResult = await team_users.bulkCreate(ObjUsers);

    res.json({
      response: "OK",
      result: [teamsResult, teamUserResult]
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* List Team to Edit */
exports.listTeamToEdit = async (req, res) => {
  try {
    const result = await teams.findAll({
      attributes: ["id", "team_code", "name", ["mobile_phone_number", "tel_no"]],
      include: [
        {
          model: team_users,
          attributes: ["team_id", "user_id"],
          include: [
            {
              model: users,
              attributes: ["id"],
              include: [
                {
                  model: user_details,
                  attributes: ['id', 'user_code', 'name', 'nickname', 'telephone_number'],
                  include: [
                    {
                      model: positions,
                      attributes: ['position_code', ['name', 'position_name'], 'description']
                    }
                  ],
                  where: {
                    position_id: {
                      [Op.in]: ['6', '7']
                    }
                  }
                }
              ],
              where: { is_active: 1, is_delete: 0 }
            }
          ],
          where: { is_active: 1, is_delete: 0 }
        }
      ],
      where: {
        team_code: req.body.team_code,
        is_active: 1,
        is_delete: 0
      }
    }).then(team => {
      if (team[0].dataValues.team_users && team[0].dataValues.team_users.length > 0) {
        team[0].dataValues.team_users.map(user => {
          user.dataValues.user.dataValues.user_detail.dataValues.nickname = user.dataValues.user.dataValues.user_detail.dataValues.nickname != null ? user.dataValues.user.dataValues.user_detail.dataValues.nickname : '-'
          user.dataValues = { ...user.dataValues.user.dataValues.user_detail.dataValues, ...user.dataValues.user.dataValues.user_detail.position.dataValues, ...user.dataValues }
          delete user.dataValues.user
          delete user.dataValues.position
        })
      }
      return team
    })
    if (result != '' && result !== null) {
      res.json({
        response: "OK",
        result: result,
      });
    } else {
      res.json({ response: "FAILED", result: "Not Found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Edit Team */
exports.editTeam = async (req, res) => {
  try {
    const { team_code, name, tel_no, team_members } = req.body;
    if (!name) {
      res.json({ response: "FAILED", result: "invalid team name." });
      return
    }
    if (!tel_no) {
      res.json({ response: "FAILED", result: "invalid telephone number." });
      return
    }
    if (!team_members && team_members.length == 0) {
      res.json({ response: "FAILED", result: "please choose member." });
      return
    }
    /* get ID ทีม */
    const get_id_team = await teams.findOne({ attributes: ['id'], where: { team_code: team_code } });
    if (get_id_team) {
      console.log(get_id_team);
      /*ลบ team_users ที่มีอยู่ก่อน */
      const delTeam_users = await team_users.destroy({
        where: {
          team_id: get_id_team.dataValues.id
        }
      });
      /* ลบสำเร็จ & แก้ไขรายการสมาชิก สำหรับทีมนั้นๆ*/
      /*แก้ไข team*/
      const TeamResult = await teams.update({
        name: name,
        mobile_phone_number: tel_no
      }, {
        where: {
          id: get_id_team.dataValues.id,
          is_active: 1,
          is_delete: 0
        }
      });
      /*สร้างรายการสมาชิก สำหรับทีมนั้นๆ*/
      var ObjUsers = team_members.map(user => { return { "team_id": get_id_team.dataValues.id, "user_id": user.id } });
      teamUserResult = await team_users.bulkCreate(ObjUsers);
      res.json({
        response: "OK",
        result: [TeamResult, teamUserResult]
      });
    } else {
      /// ไม่พบมทีมนี้ ///
      res.json({
        response: "FAILED",
        result: "Not Found: " + get_id_team,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};

/* Delete Team (Update is_delete) */
exports.deleteTeam = async (req, res) => {
  try {
    const result = await teams.update({
      is_delete: 1
    }, {
      where: {
        team_code: req.body.team_code
      }
    });
    if (result != 0) {
      res.json({
        response: "OK",
        result: "Team: " + req.body.team_code + " Deleted. Result: " + result,
      });
    } else {
      res.json({
        response: "FAILED",
        result: "Team: " + req.body.team_code + " Not Found. Result: " + result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "FAILED", result: error });
  }
};
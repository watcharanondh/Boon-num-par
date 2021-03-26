const { Op } = require('sequelize')
process.env.TZ = 'Asia/Bangkok';

exports.find_between_date = (startdate, enddate) => {
    startdate = startdate && startdate !== null && startdate !== undefined ? startdate : ''
    enddate = enddate && enddate !== null && enddate !== undefined ? enddate : ''
    var _begin = new Date(startdate)
    var _end = new Date(enddate)
    var date_fillter = { [Op.between]: [_begin, _end] }
    if ((startdate !== '' && enddate !== '' && startdate == enddate) || (startdate !== '' && enddate === '')) {
        _end = new Date(startdate)
        _end.setDate(_begin.getDate() + 1)
        date_fillter = { [Op.between]: [_begin, _end] }
    }
    if (startdate === '' && enddate !== '') {
        _end.setDate(_end.getDate() + 1)
        date_fillter = { [Op.between]: [_begin, _end] }
    }
    if (startdate === '' && enddate === '') {
        date_fillter = { [Op.ne]: null }
    }
    return date_fillter;
}
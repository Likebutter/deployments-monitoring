var express = require('express')
var router = express.Router()
var deploymentService = require('../services/deploymentService')
var _array = require('../utils/array')

var _columns = {}
var jobs = []
var columns = []
var actionColumns = []
var actions = ["restart", "add column", "dump database"]

router.get('/jobs', function(req, res, next) {
  if (jobs === undefined) {
    jobs = deploymentService.getJobs()
  }

  if (_columns.allColumns === undefined || _columns.activeColumns === undefined) {
    initializeColumns()
  }

  actionColumns = deploymentService.getActions()
  res.render('jenkins', { jobs: jobs, columns: _columns.activeColumns, inactiveColumns: _columns.inactiveColumns, actionColumns: actionColumns, actions: actions })
});

router.post('/column/refresh', function(req, res, next) {
  initializeColumns()
  res.send("Columns refreshed")
});

router.post('/column/activate', function(req, res, next) {
  columnToActivate = req.body.column
  console.log("ACTIVE COLS " + req.body)
  console.log("ACTIVE COLS " + columnToActivate)
  _columns.activeColumns.push(columnToActivate)
  _array.remove(_columns.inactiveColumns, columnToActivate)
  res.send(`Column ${columnToActivate} activated`)
});

router.post('/job', function(req, res, next) {
  jobs.push(req.body)
  //deploymentService.saveJob(req.body)
  console.log("Adding new job: " + JSON.stringify(req.body, null, 2))
  res.send("Jobs updated")
});

router.delete('/column/:columnName', function(req, res, next) {
  let columnToRemove = req.params.columnName
  console.log("Deactivating column: " + columnToRemove)
  deactivateColumn(columnToRemove)
});

deactivateColumn = function(columnName) {
  if (columnName === undefined) {
    alert(`Column ${columnName} is undefined!`)
  } else {
    let columnToDeactivate = _columns.activeColumns.find(col => { return col === columnName })
    _columns.inactiveColumns.push(columnToDeactivate)
    _array.remove(_columns.activeColumns, columnName)
  }
}

initializeColumns = function() {
    _columns.allColumns = deploymentService.getAllColumns(jobs)
    _columns.activeColumns = deploymentService.getActiveColumns()
    _columns.inactiveColumns = _columns.allColumns.filter(column => !_columns.activeColumns.includes(column))
} 

module.exports = router;
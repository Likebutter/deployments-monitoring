var mongo = require('./mongoService')
var PropertiesReader = require('properties-reader')

setActiveColumns = function() {
  if (_columns.activeColumns === undefined) {
    let activeProperties = []
    deploymentProperties.getAllProperties().forEach(function(property) {
      if (property)
      jobs.push(dep)
    });
  }
}

mapKeys = function(object, keyList) {
  for (let key in object) {
    keyList.push(key)
  }
}

exports.getActions = function(object) {
    var actionsProperties = PropertiesReader('actions.properties')
    return actionsProperties.getAllProperties()
}

exports.getAllColumns = function(jobs) {
    var columns = []
    mapKeys(jobs[0], columns)
    return columns
}

exports.getActiveColumns = function(allColumns) {
    var activeColumns = []
    PropertiesReader('deployment-report-properties.properties').each((key, value) => {
        if (value === 'true') {
            activeColumns.push(key)
        }
    });
    return activeColumns
}

exports.getJobs = function(object) {
    return mongo.getActiveJobs()
}

exports.saveJob = function(job) {
    mongo.insert(job)
}
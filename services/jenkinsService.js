const JENKINS_URL = "https://"
const DEPLOYMENT_PATTERN = "mv-.+_c[0-9]{5}_.+_.*_.*"

exports.getJobs = function() {
    fetch(`${JENKINS_URL}/jobs/api/json`)
    .then(resp => {
        resp.json().forEach
    })
}

getSupportedDeploymentsList = function() {

}
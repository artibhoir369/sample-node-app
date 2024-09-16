pipeline {
	agent any

	environment {
		DOCKER_IMAGE = 'sample-node-app'
	}

	triggers {
		githubPush()
	}

	stages {
		stage('Checkout') {
			steps {
				script {
					checkout([$class: 'GitSCM',
						branches: [[name: '*/main']],
						userRemoteConfigs: [[url: 'https://github.com/artibhoir369/sample-node-app.git']]
					])
				}
			}
		}
	}
}

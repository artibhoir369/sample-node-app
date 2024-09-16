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
				git 'https://github.com/artibhoir369/sample-node-app.git'
			}
		}
	}
}

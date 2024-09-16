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
		
		stage('Build Docker Image') {
			steps {
				script {
					echo "Building Docker Image ${DOCKER_IMAGE}"
					docker.build(DOCKER_IMAGE)
					}
				}
			}

		stage('Run Docker Container') {
			steps {
				script {
					docker.image(DOCKER_IMAGE).run('-d -p 3000:3000')
					}
				}
			}
	}
}

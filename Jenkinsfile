pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'sample-node-app'
        CONTAINER_NAME = 'sample-node-app-container'
    }

    triggers {
        githubPush()  // This trigger assumes GitHub webhook integration
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
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh """
                    if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    fi
                    """
                }
            }
        }
        
        stage('Run Docker Container') {
            steps {
                script {
                    echo "Running Docker Container ${CONTAINER_NAME}"
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker containers
            script {
                sh """
                if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                    docker stop ${CONTAINER_NAME}
                    docker rm ${CONTAINER_NAME}
                fi
                """
            }
        }
    }
}


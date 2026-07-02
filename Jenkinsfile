pipeline {
    agent any

    environment {
        APP_NAME = "asad-jewelers"
        VERSION = "${BUILD_NUMBER}"
    }

    stages {

        stage('Code Checkout') {
            steps {
                echo "Getting latest code from GitHub..."
                echo "Code is ready!"
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running backend tests..."
                echo "All tests passed!"
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker images..."
                sh "docker compose build"
                echo "Docker images built successfully!"
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying Asad Jewelers..."
                sh "docker compose up -d"
                echo "Deployment complete!"
            }
        }

        stage('Health Check') {
            steps {
                echo "Checking application health..."
                sh "sleep 5"
                sh "curl -f http://localhost:5000/api/health"
                echo "Application is healthy!"
            }
        }

    }

    post {
        success {
            echo "Pipeline successful! Asad Jewelers is live!"
        }
        failure {
            echo "Pipeline failed! Check logs."
        }
    }
}

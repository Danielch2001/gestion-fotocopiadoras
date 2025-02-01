pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'Node 18'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Danielch2001/gestion-fotocopiadoras.git' 
            }
        }

        stage('Pre-build: Lint & Audit') {
            steps {
                script {
                    dir('backend') {
                        sh 'npx eslint . --fix'
                        sh 'npm audit --production'
                    }
                    dir('frontend') {
                        sh 'npx eslint . --fix'
                        sh 'npm audit --production'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        sh 'npm install'
                        sh 'docker build -t gestion-fotocopiadoras-backend .'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build'
                        sh 'docker build -t gestion-fotocopiadoras-frontend .'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir('backend') {
                        sh 'npm test'
                    }
                    dir('frontend') {
                        sh 'npm run test'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}

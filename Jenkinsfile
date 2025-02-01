pipeline {
    agent any

    tools {
        nodejs 'Node 18'
    }


    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Danielch2001/gestion-fotocopiadoras.git'
            }
        }

        stage('Pre-build: Lint & Audit') {
        steps {
            script {
                dir('backend') {
                    sh 'npm install'
                    sh 'chmod +x node_modules/.bin/eslint'
                    sh 'npx eslint . --fix'
                    sh 'npm audit --production'
                 }
                dir('frontend') {
                    sh 'npm install'
                    sh 'chmod +x node_modules/.bin/eslint'
                    sh 'npx eslint . --fix'
                    sh 'npm audit --production'
                }
                }
             }
            }

        stage('Build') {
            steps {
                script {
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Test') {
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

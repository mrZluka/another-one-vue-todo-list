pipeline {
    agent {
        docker {
            image 'node:12-alpine3.9' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install --max-old-space-size=400' 
                sh 'npm run-script build --max-old-space-size=400'
            }
        }
    }
    post {
        always {
            script{
                    zip archive: true, dir: 'dist', zipFile: 'build.zip'
                }
            archiveArtifacts artifacts: 'build.zip', fingerprint: true
        }
    }
}

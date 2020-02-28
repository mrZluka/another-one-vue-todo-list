pipeline {
    agent {
        docker {
            image 'node:12-alpine3.9' 
            args '-p 3000:3000' 
        }
    }
    environment{
        DIST_FOLDER = 'dist'
        ARTIFACT_FILE = 'build.zip'
        IS_EXISTS = fileExists ARTIFACT_FILE
    }
    stages {
        stage('Remove old artifacts') {
            when {expression{ IS_EXISTS == 'true'}} 
            steps {
                sh 'rm build.zip'
            }
            
        }
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
                    zip archive: true, dir: DIST_FOLDER, zipFile: ARTIFACT_FILE, glob: '**/*.*'
                }
            archiveArtifacts artifacts: ARTIFACT_FILE, fingerprint: true
        }
    }
}

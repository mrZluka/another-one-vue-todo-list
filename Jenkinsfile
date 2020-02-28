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
    }
    stages {
        stage('Remove old artifacts') {
            when {expression{fileExists ARTIFACT_FILE == 'true'}} 
            steps {
                rm ARTIFACT_FILE
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
                    zip archive: true, dir: DIST_FOLDER, zipFile: ARTIFACT_FILE
                }
            archiveArtifacts artifacts: ARTIFACT_FILE, fingerprint: true, glob: '**/*.*'
        }
    }
}

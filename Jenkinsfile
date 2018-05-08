pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.ci'
      args '-v /etc/group:/etc/group:ro ' +
           '-v /etc/passwd:/etc/passwd:ro ' +
           '-v /var/lib/jenkins:/var/lib/jenkins'
    }
  }

  environment {
    TEST_NODE = credentials('TEST_NODE')
    BUCKET = 'beer.aepps.com'
  }

  stages {
    stage('Build') {
      steps {
        sh 'cp -r /node_modules ./'
        sh 'yarn build'
        archiveArtifacts artifacts: 'dist/*', fingerprint: true
      }
    }

    stage('Deploy') {
      when {
        expression { BRANCH_NAME ==~ /master/ }
      }
      steps {
        withAWS(credentials: 'aws-jenkins-userpass') {
          s3Upload bucket: env.BUCKET, acl: 'PublicRead', workingDir: 'dist', includePathPattern: '*'
        }
      }
    }
  }
}

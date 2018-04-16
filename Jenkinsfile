pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.ci'
      args '-v /etc/group:/etc/group:ro ' +
           '-v /etc/passwd:/etc/passwd:ro ' +
           '-v /var/lib/jenkins:/var/lib/jenkins ' +
           '-v /var/run/docker.sock:/var/run/docker.sock:rw ' +
           '-v /usr/bin/docker:/usr/bin/docker:ro ' +
           '--group-add docker'
    }
  }

  environment {
    TEST_NODE = credentials('TEST_NODE')
    DOCKER_REGISTRY = 'https://166568770115.dkr.ecr.eu-central-1.amazonaws.com'
    DOCKER_IMAGE = 'republica/beer-aepp'
    ECR_CREDENTIAL = 'ecr:eu-central-1:aws-jenkins'
  }

  stages {
    stage('Build') {
      steps {
        sh 'cp -r /node_modules ./'
        sh 'yarn build'
      }
    }

    stage('Publish') {
      steps {
        script {
          docker.withRegistry(env.DOCKER_REGISTRY, env.ECR_CREDENTIAL) {
            docker.build(env.DOCKER_IMAGE).push('latest')
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        build 'deploy-beer-aepp'
      }
    }
  }
}

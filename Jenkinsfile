pipeline {
    agent any
    tools { nodejs "NodeJS" }
    environment {
        PORT = "3000"
    }
    stages {
        stage("Build") {
            steps {
                nodejs("NodeJS") {
                    // usa npm ci pra garantir install limpo
                    sh 'npm install'
                    // build gera a pasta .next
                    sh 'npm run build'
                }
            }
        }
        stage("Start") {
            steps {
                nodejs("NodeJS") {
                    // força o Next a escutar em 0.0.0.0 na porta 3000
                    sh 'npm run start -- -p $PORT -H 0.0.0.0'
                }
                echo "App started successfully on port $PORT"
            }
        }
    }
}

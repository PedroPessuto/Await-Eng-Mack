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
                    // Instala dependências
                    sh 'npm install'
                    // Gera a pasta .next para produção
                    sh 'npm run build'
                }
            }
        }

        stage("Start with PM2") {
            steps {
                nodejs("NodeJS") {
                    // Instala pm2 se ainda não estiver instalado
                    sh 'npm install -g pm2'

                    // Mata processo antigo se estiver rodando
                    sh 'pm2 delete next-app || true'

                    // Inicia com pm2, garantindo que fique rodando mesmo após o fim da build
                    sh 'pm2 start npm --name "next-app" -- run start -- -p $PORT -H 0.0.0.0'

                    // (Opcional) Salva o estado pra iniciar com a máquina
                    sh 'pm2 save'
                }
                echo "✅ App started via PM2 na porta $PORT"
            }
        }
    }
}
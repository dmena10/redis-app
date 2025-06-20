pipeline {
    agent any
    stages{
         stage('Build da imagem docker'){
            steps{
            sh 'docker build -t redis-app .'
            }
         }
        stage('subir docker compose'){
            steps{
            sh 'docker compose up --build -d'
            }
        }
        stage('sleep subida de containers'){
            steps{
            sh 'sleep 10'
            }
        }
        stage('teste da aplicação'){
            steps{
            sh 'teste-app.sh'
            }

        }

    }
   
}


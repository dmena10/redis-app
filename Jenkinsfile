pipeline {
    agent any
    stages {
        stage('build da imagem docker'){
            steps{
                sh 'docker build -t devops/app .'
            }
        }
        stage('subir docker compose - redis e app'){
            steps {
                sh 'docker compose up --build -d'
            }
        }
        stage('sleep para subida de containers'){
            steps{
                sh 'sleep 10'
            }
        }
        stage('Sonarqube validation'){
            steps{
                script{
                    scannerHome = tool 'sonar-scanner';
                }
                withSonarQubeEnv('sonar-server'){
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=redis-app -Dsonar.sources=. -Dsonar.host.url=${env.SONAR_HOST_URL} -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
                }
            }
        }
        stage("Quality Gate"){
            steps{
                waitForQualityGate abortPipeline: true
            }
        }
        stage('teste da aplicação'){
            steps{
                sh 'chmod +x teste-app.sh'
                sh './teste-app.sh'
            }
        }
        stage('shutdown dos containers de teste'){
            steps{
                sh 'docker compose down'
                
            }
        }
        stage('upload docker image'){
            steps{
                script{
                    withCredentials([usernamePassword(credentialsId: 'nexus-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD' )]){
                        sh 'docker login -u $USERNAME -p $PASSWORD localhost:8082'
                        sh 'docker tag devops/app:latest localhost:8082/devops/app'
                        sh 'docker push localhost:8082/devops/app'
                    }
                }
            }
        }
        stage('Apply kubernete files'){
            steps{
                sh '/usr/local/bin/kubectl apply -f k8s/redis.yaml'
                sh '/usr/local/bin/kubectl apply -f k8s/redis-app.yaml'
            }
        }
       

    }
}

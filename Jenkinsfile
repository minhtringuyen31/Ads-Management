pipeline {
    agent any
    tools {
        nodejs 'Nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                // Thực hiện git pull từ nhánh feature/init-server
                git branch: 'feature/init-server', url: 'https://github.com/minhtringuyen31/Ads-Management.git', credentialsId: "web"
        }

            }
        stage('Install Dependencies') {
            steps {
                // Bước này để cài đặt các dependencies của Node.js
                script {
                    
                    dir('Server') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                // Bước này để thực hiện các bước build hoặc compile (nếu cần)
                script {
                    
                    dir('Server') {
                        sh 'docker build -t web .'
                        sh 'docker ps -a'
                        sh 'docker stop web'
                        sh 'docker rm web -f'
                        sh 'docker images'
                        sh 'docker run -p 80:5001 -d --name web web:latest'
                        sh 'docker ps -a'
                        sh 'docker logs web'
                        sh 'docker container logs web'
                    }
                }
            }
        }

        

        stage('Deploy') {
            steps {
                // Bước này để triển khai ứng dụng (nếu cần)
                script {
                    // Thay thế lệnh dưới đây bằng lệnh triển khai thực tế của bạn
                    echo 'Deployment step...'
                    dir('Server') {
                        sh 'docker ps -a'
                    }
                }
            }
        }
    }

    
}

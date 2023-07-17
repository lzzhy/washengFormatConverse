pipeline {
    agent any

    environment{
        
        projectName = 'nearhub_monitor'
        
        // 容器内外的端口
        port = '9609'
        expose = '80'

        // 版本
        version = '1.0.0'
        
        // git地址
        url = 'https://gitee.com/auditoryworks_hamedal/washeng_tracking-admin.git';

        // 飞书token
        token = '21980389-6d48-47b2-84d1-f36f31d84b3d'
        website = 'http://47.101.153.177:9609/'
     }

    // 存放所有任务的合集
    stages {
        // 拉取git代码
        stage('拉取Git代码') {
            steps {
               checkout([$class: 'GitSCM', branches: [[name: '*/test']], extensions: [], userRemoteConfigs: [[credentialsId: 'bc1bd60b-ff27-4d93-b6dc-b9534d4a74a6', url: url]]])
            }
        }

        stage('安装依赖包') {
            steps {
                nodejs('nodeJs_16') {
                    sh '''
                    pnpm install --no-frozen-lockfile
                    '''
                }
            }
        }

        // 打包产物
        stage('打包产物') {
            steps {
                nodejs('nodeJs_16') {
                    sh '''
                    npm run build:dev
                    '''
                }
            }
        }
         // 制作自定义镜像
        stage('制作自定义镜像') {
            steps {
                script {
                        sh '''
                        rm -rf deploy_conf/conf.d 
                        cp -r deploy_conf/dev/conf.d deploy_conf/conf.d 
                        # 打包镜像
                        docker build -f Dockerfile -t ${projectName}:${version} .'''
                        sh '''docker image prune -f'''
                }
            }
        }

        // 更新启动容器
        stage('更新启动容器') {
            steps {
                script {
                   sh '''
                    # 定义镜像名称
                    imageName=${projectName}:${version} \
                    
                    # 获取是否有根据当前镜像启动的容器
                    containerId=`docker ps -a | grep ${projectName} | awk '{print $1}'` \
                    
                    # 如果存在，停止并删除 容器
                    if [ "$containerId" != "" ] ; then 
                        docker stop $containerId     
                        docker rm $containerId         
                        echo "Delete Container Success" 
                    fi
                    
                    # 启动镜像
                    docker run -d -p $port:$expose --name ${projectName} ${imageName}
                    
                    echo "Start Container Success"
                    echo $projectName'''
                }
            }
        }

        // 推送更新消息到飞书
        stage('推送更新消息到飞书') {
            steps {
                script {
                   sh '''sh ./feishu.sh ${token} ${projectName} ${website}'''
                }
            }
        }
    }
}

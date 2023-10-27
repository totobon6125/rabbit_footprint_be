# 프로젝트 위치 설정
REPOSITORY=/home/ubuntu/rabbit_footprint_be

# 프로젝트 위치로 이동
cd $REPOSITORY

# 의존성 설치
echo "> install dependency"
yarn

# 프로젝트 build
#echo "> build application"
#nest build

# pm2 실행 또는 리로드
if pm2 list | grep -q "rabbit-footprint"; then
  echo "> reload application"
  pm2 reload rabbit-footprint
else
  echo "> start application"
  pm2 start src/app.js --name rabbit-footprint
fi
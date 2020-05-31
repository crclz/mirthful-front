# /bin/bash
ng build --prod

rm -r temp_docker_build
mkdir temp_docker_build
cp -r dist temp_docker_build/
cp nginx.conf temp_docker_build/
cp DOCKERFILE temp_docker_build/

cd temp_docker_build

docker build . -t mirthful-front:latest
# Sample Node.js Application to display resume

## Commands

```bash
docker run -itd --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts

ngrok http 8080

# update url in git webhook

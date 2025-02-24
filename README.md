[![Deploy on release](https://github.com/Arquisoft/wiq_en3a/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_en3a/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en3a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en3a)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en3a&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en3a)

# Are you smarter than a penguin? 🐧
Thank you for checking out our game! Below are some useful links to get started:

- **[Application](http://51.103.210.249:3000/)**: Click this link to start playing!
  
- **[Documentation](https://arquisoft.github.io/wiq_en3a/)**: Explore detailed documentation to learn more about the game and its features.

- **[OpenAPI](http://51.103.210.249:8000/api-doc/)**: Explore detailed documentation of our API.

Feel free to explore the application and documentation, and don't hesitate to reach out if you have any questions or feedback. Enjoy playing STAP!

## Introduction

This is a web application where you can show off your knowledge.🧠
Experience the best of both worlds in "Are You Smarter Than a Penguin?🐧" with two exciting game modes: Normal and Trivia. 
 
 In the Normal Game, answer general knowledge questions within a time limit🕐. If you choose Easy mode, you have more time to think through your answers, while Hard mode speeds things up with shorter time limits, adding an extra challenge. 
 
 The Trivia Game tests your skills across five categories—Sports, Science, History, Geography, and Entertainment. Earn a "cheese🧀" for every correct answer, and collect all five to win. But watch out—you start with 6 hearts in Easy mode and only 3 in Hard mode, and if you lose them all, it's game over💕.

Create an account or log in to play with friends and find out who knows the most. Enjoy the variaty of questions, which are automatically generated from a vast pool of data available in Wikidata🌎. 
Let's get started!

  

This is a base repo for the [Software Architecture course](http://arquisoft.github.io/) in [2023/2024 edition](https://arquisoft.github.io/course2324.html). 

➡This repo is a basic application composed of several components.

- **Webapp**. React web application that uses the gateway service to allow basic login and new user features.
- **Wikidata service**.Express service for the question generation.
- **User service**. Express service that is responsible for managing all user-related operations
- **Gateway service**. Express service that is exposed to the public and serves as a proxy to the two previous ones.


Both the user and auth service share a Mongo database that is accessed with mongoose.

## Quick start guide 🏁

### Using docker

The fastest way for launching this sample project is using docker. Just clone the project:

```sh
git clone https://github.com/Arquisoft/wiq_en3a.git
```

and launch it with docker compose:

```sh
docker compose --profile dev up --build
```

### Starting Component by component🔍

First, start the database. Either install and run Mongo or run it using docker:

```docker run -d -p 27017:27017 --name=my-mongo mongo:latest```

You can also use services like Mongo Altas for running a Mongo database in the cloud.

Now, launch the auth, user and gateway services. Just go to each directory and run `npm install` followed by `npm start`.

Lastly, go to the webapp directory and launch this component with `npm install` followed by `npm start`.

After all the components are launched, the app should be available in localhost in port 3000.

## Deployment➡

For the deployment, we have several options. 

The first and more flexible is to deploy to a virtual machine using SSH. This will work with any cloud service (or with our own server). 

Other options include using the container services that most cloud services provide. This means, deploying our Docker containers directly. 

We are going to use the first approach, creating a virtual machine in a cloud service and after installing docker and docker-compose, deploy our containers there using GitHub Actions and SSH.

### Machine requirements for deployment✅

The machine for deployment can be created in services like Microsoft Azure or Amazon AWS. These are in general the settings that it must have:

- Linux machine with Ubuntu > 20.04.
- Docker and docker-compose installed.
- Open ports for the applications installed (in this case, ports 3000 for the webapp and 8000 for the gateway service).

Once you have the virtual machine created, you can install **docker** and **docker-compose** using the following instructions:

```ssh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce
sudo usermod -aG docker ${USER}
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Continuous delivery (GitHub Actions)🐱‍👤

Once we have our machine ready, we could deploy by hand the application, taking our docker-compose file and executing it in the remote machine. 

In this repository, this process is done automatically using **GitHub Actions**. The idea is to trigger a series of actions when some condition is met in the repository. 

As you can see, unitary tests of each module and e2e tests are executed before pushing the docker images and deploying them. Using this approach we avoid deploying versions that do not pass the tests.

The deploy action is the following:

```yml
deploy:
    name: Deploy over SSH
    runs-on: ubuntu-latest
    needs: [docker-push-userservice,docker-push-authservice,docker-push-gatewayservice,docker-push-webapp]
    steps:
    - name: Deploy over SSH
      uses: fifsky/ssh-action@master
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        user: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        command: |
          wget https://raw.githubusercontent.com/arquisoft/wiq_en3a/master/docker-compose.yml -O docker-compose.yml
          wget https://raw.githubusercontent.com/arquisoft/wiq_en3a/master/.env
          docker compose down
          docker compose --profile prod up -d
```

This action uses three secrets that must be configured in the repository:
- DEPLOY_HOST: IP of the remote machine.
- DEPLOY_USER: user with permission to execute the commands in the remote machine.
- DEPLOY_KEY: key to authenticate the user in the remote machine.

Note that this action logs in the remote machine and downloads the docker-compose file from the repository and launches it. Obviously, previous actions have been executed which have uploaded the docker images to the GitHub Packages repository.

##  👩‍💻Members:

- Sergio Truébano Robles -> uo289930@uniovi.es
- Pedro Limeres Granado -> uo282763@uniovi.es
- Alberto Guerra Rodas -> UO282421@uniovi.es
- Ángel Macías Rodríguez -> uo289362@uniovi.es
- Rita Fernández-Catuxo Ortiz -> uo284185@uniovi.es
- Vira Terletska -> uo305097@uniovi.es
- Sergio Llenderrozos Piñera -> uo283367@uniovi.es

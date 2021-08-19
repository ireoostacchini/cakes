# cakes



This project contains a node / typescript web API; it was developed in two days for a technical test.



## Approach



I decided to set myself a time limit of two days, and focus on the work most relevant to the job description - the back-end API. 

That meant I was not able to work on a front-end, or successfully deploy the API to the cloud.



## Architecture

The aim was to set out a [clean](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/), well-organised, clearly-named, scalable architecture. 

![architecture](https://github.com/ireoostacchini/cakes/blob/main/docs/architecture.png)

I chose [Inversify](https://github.com/inversify/InversifyJS) to provide dependency injection.

For data persistence, I chose Postgres running on [ElephantSQL](https://www.elephantsql.com/) - this would mean no local setting up of a database.



## Testing

I used Jest, and added some unit tests. However, I did not manage to write the most important unit tests - for the key 'business logic' file, cakesManager.ts. I just ran out of time.

As the above diagram suggests, I also intended to write an e2e test, hitting all the endpoints. These tests are quite fragile, so I keep them to a minimum, but I think they are as important as unit tests. 

I have also provided (in the /docs folder) a Postman collection for testing the endpoints locally.



## Installation



- Prerequisites - node / npm

- clone the repository locally
- replace the src/env.development.json file with the one supplied via email
- at a command prompt, navigate to the /src folder
- **npm run serve** will start the API at http://localhost:3000




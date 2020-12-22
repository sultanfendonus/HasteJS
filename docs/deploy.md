# Deployment
You can easily deploy a hasteJs project as you deploy a normal nodejs project.

Here is a basic example of deployment - 

1. Login to your server, and install [nodejs](https://nodejs.org/en/). 
   

2. Install pm2 globally \
   `npm install pm2 -g`
   

3. Clone your repository and go to project root.


4. Run `npm install` for node dependency.


5. Create a `.env` file and copy the `env.example` file content to the .env file.
   

6. Change all nessasary changes like port number to 80, set database credential etc. 
   and save the file.
   


7. Run `npm run deploy` for deployment.


8. If you want to stop a hasteJs application just run `pm2 list` for a list of applications running
   and run `pm2 stop id` to stop an application. For more info about pm2 visit https://pm2.keymetrics.io/


9. If you make any changes to the application code base then you must restart
the process in pm2. Run `pm2 restart id` for the restart of application.

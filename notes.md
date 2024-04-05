## Pushing and pulling between GitHub and VS Code:

- it seems pretty easy, on GitHub, there is a button to commit. It seems to update automatically when I commit from VS Code
- VS Code: go to source control, hover over 3 buttons and hit pull. Same place for commit. don't forget to add comment before you commit

## SSH into my website instance:

- be inside cs260/Keys
- ssh -i balletApp.pem ubuntu@34.230.126.38
- ls -l will list all the things on the website
- type exit to get out
- **Remember to release the elastic IP address and terminate my server at the end of this class**

## Domain name:

- need to go to AWS Rout 53 to reserve and by a domain name **Go and cancle it after this class**
- once you get it, you need to connect it to your elastic IP address
- then can go into ssh
  - ssh -i balletApp.pem ubunto@ballet260.click
  - vi Caddyfile
    - i means insert
    - press esc to get out of typing
    - :wq is save and exit
  - sudo service caddy restart: saves changes
  - exit gets you out of your web service

## HTML:

- to change color you can list basic colors and don't need the number

## CSS:

- npm install bootstrap@5.2.3 - this will install bootstrap later in my app - get latest version link
- placing elements inside their own div and giving them a class="" means you can give it its own styling in the css file.
- div.login-div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  } - this is so you can get a centered box of information on the page

  ## How to deploy my website!!!

  - C:\Users\18015\Desktop\cs260\startup **be in this folder in the terminal**
  - ./deployFiles.sh -k C:/Users/18015/Desktop/cs260/Keys/balletApp.pem -h ballet260.click -s startup
    - don't forget to do the same for simon - clone the repo into cs260

## running on the server

- node server.js
- this will run on port 3000
- go to localhost:3000
- when you want to quit hit ctrl + c

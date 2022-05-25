

$ git add .
warning: LF will be replaced by CRLF in package.json.
The file will have its original line endings in your working directory

solve : $ git config core.autocrlf true

<!-- heroku deploy steps -->

1. heroku login

2. heroku create project-name

3. heroku addons:create mongolab:sandbox  // removed from heroku

4. git add -A // add all changes

5. git commit -m "changes commit"
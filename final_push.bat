@echo off
echo Initializing Git...
git init

echo Setting branch to main...
git branch -M main

echo Configuring remote...
git remote remove origin 2>nul
git remote add origin https://github.com/RickBillie-pixel/renovawrap-website.git

echo Adding files...
git add .

echo Committing...
git commit -m "Initial commit via agent"

echo Pushing to GitHub...
git push -u origin main

echo Done.
pause

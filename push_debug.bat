@echo off
echo Starting git push sequence > push_log.txt
echo %DATE% %TIME% >> push_log.txt

echo Running: git status >> push_log.txt
git status >> push_log.txt 2>&1

echo Running: git remote add origin >> push_log.txt
git remote add origin https://github.com/RickBillie-pixel/renovawrap-website.git >> push_log.txt 2>&1
if %ERRORLEVEL% NEQ 0 echo Remote add failed (might exist) >> push_log.txt

echo Running: git remote -v >> push_log.txt
git remote -v >> push_log.txt 2>&1

echo Running: git branch -M main >> push_log.txt
git branch -M main >> push_log.txt 2>&1

echo Running: git add . >> push_log.txt
git add . >> push_log.txt 2>&1

echo Running: git commit -m "Initial commit" >> push_log.txt
git commit -m "Initial commit" >> push_log.txt 2>&1

echo Running: git push -u origin main >> push_log.txt
git push -u origin main >> push_log.txt 2>&1

echo Done >> push_log.txt

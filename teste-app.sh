RESULT="'wget -qO - http://localhost:8080/ '"
wget -q localhost:8090
if [ $? -eq 0 ]; then
    echo "Redis app is running successfully."
else
    echo "Redis app is not running."
fi
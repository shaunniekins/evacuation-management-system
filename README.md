# Evacuation Management System

This repository is created for managing evacuation procedures during emergencies. It is built using Django for the backend and ReactJS for the frontend.

## Use Case

The system is designed to efficiently manage evacuation procedures during emergencies, ensuring the safety and well-being of all individuals involved. It provides real-time updates, resource allocation, and communication channels to streamline the process.

### Database

- [Install MySQL (prerequisite)](https://dev.mysql.com/downloads/installer/)
- [Install PhpMyAdmin (optional)](https://www.phpmyadmin.net/downloads/)
- Terminal:
  - `sudo mysql –u root –p`
  - `CREATE USER 'username' IDENTIFIED BY 'password';`
- Open http://localhost/phpMyAdmin/ in your browser
  - Log-in with the username and password you used for user creation
- Find import then choose the file to import.

#### Change the user and password with the credentials in MySQL setup registration

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'evacuation_management_system',
        'ROOT': "root",
        'PASSWORD': "Hello_World123",
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### Backend

- [Install Python 3.11.2 or higher (prerequisite)](https://www.python.org/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/download)
- Commands:

```
cd evacuation_manage_system (or code evacuation_manage_system)
source env/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

- Open http://127.0.0.1:8000/

### Frontend

- [Install node/npm (prerequisite)](https://nodejs.org/en/download)
- Commands:

```
cd frontend
npm install
npm run start
```

- Open http://localhost:3000/evacuation-management-system

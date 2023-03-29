# NgxPlayer

## Предварительно необходимо установить:
* nodejs
* npm или yarn
* @angular/cli

* pip3

Инструкция установки для Linux:
1. `sudo apt-get install -y nodejs`

2. `sudo apt install npm` или `npm install --global yarn`

3. `sudo npm install -g @angular/cli` 

4. `sudo apt-get install python3-pip`

## Клонируем
5. `git clone https://github.com/LikeBench-dev/ngx-player-SC4try.git`

## Запускаем
#### Если установлен  `npm`
6. В папке с плеером `npm install`

7. `npm run start`

8. В браузере http://localhost:4200/

 #### Если установлен  `yarn`
  6. В папке с плеером `yarn`
  7. Запускаем `yarn start`
  8. В браузере http://localhost:4200/

P.S. Обратить внимание на версию nodejs `node -v`  в терминале запуска приложения


## Готовим сервер

   Рекомендуется использование virtual environments
     В папке с плеером `python -m venv ./videoserver/venvBackend`
     `source ./videoserver/venvBackend/bin/activate`

  9. Обновляем пакеты в соответствии с requirements.txt
     `python -m pip install -r ./videoserver/requirements.txt`

  10. Запускаем сервер бэкенд на localhost:8000, который слушает localhost:4200
     `./videoserver/manage.py migrate`
     `./videoserver/manage.py runserver`

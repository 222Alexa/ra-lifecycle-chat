# ra-lifecycle-chat

Анонимный чат
===

Вам необходимо реализовать абсолютно анонимный чат (такого, конечн,о не бывает ☺), в который сможет отправлять сообщения любой желающий.

Но есть важное требование: если вы даже открыли другую вкладку в браузере (написание всё равно должно идти с вашего аккаунта).

Backend вы можете взять готовый (из каталога `backend`).

![Chat](https://github.com/222Alexa/ra16-homeworks/raw/master/lifecycle-http/chat/assets/chat.png)

## Общая механика

При создании компонента создаётся интервал или таймаут и делается периодический опрос сервера (временной интервал предложите сами) в виде http-запроса GET на адрес http://localhost:7777/messages?from={id}, где id - идентификатор последнего полученного сообщения (при первоначальной загрузке - 0).

Формат присылаемых данных:
```json
[
    {
        "id": 1,
        "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
        "content": "Какая сейчас погода за окном?"
    },
    {
        "id": 2,
        "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
        "content": "К сожалению, я не знаю ответа на этот вопрос"
    },
]
```
Где userId - уникальный идентификатор анонимного пользователя. Подумайте, как его сгенерировать и где хранить (если не придумали - прочитайте спойлеры).

Полученные данные отображаются в виде блоков с возможностью различным выравниванием:
* ваши - справа
* не ваши - слева

Ваши или не ваши вы определяете путём сравнения своего userId и того, что в сообщении.

Добавление:
1. Вы заполняете форму и нажимаете кнопку "Добавить"
1. Выполняется http-запрос POST на адрес http://localhost:7777/messages, в теле запроса передаётся следующий JSON:
```json
{
    "id": 0,
    "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
    "content": "То, что было введно в поле ввода"
}
```
3. После чего ждёте, пока не произойдёт получение данных по интервалу. Подумайте, как сделать ожидание комфортным для пользователя, и как решают эту проблему существующие чаты.

<details>
  <summary>Спойлеры</summary>
  
  Добиться уникальности "анонимов" можно просто записав в local/sessionStorage случайно сгенерированный id (nanoid, uuid). И использовать его для отправки и получения данных.

  Подумайте, какие уязвимости в безопасности создаёт подобная схема, и возможна ли отправка сообщений от лица другого пользователя?

  Подумайте над тем, как это можно предотвратить?
</details>

## Advanced

1. Попробуйте раскрашивать сообщения от разных пользователей в разные цвета.
1. Попробуйте реализовать авто-скроллинг до последнего сообщения.

[Server](https://alexa222-heroku.herokuapp.com/)
[Backend](https://github.com/222Alexa/backEnd.git)

[GH-Page](https://222alexa.github.io/ra-lifecycle-chat/)

[![Build status](https://ci.appveyor.com/api/projects/status/5ix3u166u2b1nod1/branch/main?svg=true)](https://ci.appveyor.com/project/222Alexa44925/ra-lifecycle-chat/branch/main)
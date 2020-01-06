<p align="center">
  <img src="http://educacaometodista.org.br/++theme++novo-logo-rede/img/lrm.png" width="120">
</p>

<h3 align="center">
  Mail Sender: API Rest :key:
</h3>

<blockquote align="center">
A Rest API of the email triggering tool made by <a href="https://github.com/LeuAlmeida"><strong>Léu Almeida</strong></a> for <a href="https://github.com/educacaometodista"><strong>@educacaometodista</strong></a>
</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/LeuAlmeida/mail.sender.api?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Léu Almeida" src="https://img.shields.io/badge/made%20by-Léu%20Almeida-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

</p>

<hr/>

<h3>:heavy_check_mark: Stack</h3>

|       Dependencies            |     Security and Prevent errors   |
|-------------------------------|:---------------------------------:|
|       Nodemon                 |     Bcrypt                        |
|       Bee-queue               |     Dotenv                        |
|       Convert Excel to Json   |     CORS                          |
|       Pg and pg-hstore        |     JWT                           |
|       Sequelize               |     Sentry                        |
|       Crypto                  |     Youch                         |
|       Express                 |     Yup                           |
|       Multer                  |     Path                          |
|       Node-schedule           |                                   |

<h3>:white_check_mark: About the API</h3>

With this API you can make secure and fast email triggers with Nodemailer. The session control is done via JWT and queues are maintained with Redis and Bee Queue. The database used is PostgreSQL for relational information control.<br/>
<a href="https://github.com/LeuAlmeida/mail.sender">:mailbox: Check out the Front End application developed for this application.</a>

<h3>:electric_plug: Preparing the server</h3>

**Requeriments:**
* NodeJS >= 10.16.3
* Yarn >= 1.19.1
* Docker >= 19.03.3
  * PostgreSQL Docker Image
  * Redis Alpine Docker Image

<h3>:arrows_counterclockwise: Running the application</h3>

```console
// Clone the project
$ git clone https://github.com/LeuAlmeida/mail.sender.api.git

// Entering the folder
$ cd mail.sender.api

// Installing the dependencies
$ yarn
```

In the first terminal:
```console
$ yarn dev
```

In the second terminal:
```console
$ yarn queue
```

<hr/>

<h4 align="center">
<a href="http://linkedin.com/in/leonardoalmeida99">Connect me in LinkedIn</a> | <a href="http://behance.net/almeida99">See my Behance</a> | <a href="https://leunardo.dev">Click here to go to my CV</a>
</h4>

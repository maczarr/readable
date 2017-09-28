# Readable
Readable is an anonymous content and comment App. People can create posts and comment on them, both can be edited and deleted. Posts as well as comments can be up and down voted. There is no user registration. Readable is an App for Udacitys React Nanodegree.

## Installation
You need [npm](https://nodejs.org/) on your machine. Simply clone this project with git or download it as a ZIP. To unzip the file you need a tool like "unzip", "7-Zip" or "WinZip"). The npm commands might need sudo/root permissions on your system.

Steps with git in your terminal:
```
git clone https://github.com/maczarr/readable.git
cd readable
npm install
npm start
```

or after downloading the ZIP-File using unzip from the directory where the download was saved:
```
unzip readable-master.zip
cd readable-master
npm install
npm start
```

## API Backend

Readable expects the necessary API Backend to be available at http://localhost on Port 3001. You can change this in [api.js](src/utils/api.js).
This App is based on the [ReactND Project Readable API-Server](https://github.com/udacity/reactnd-project-readable-starter) which is *not included* in this project.

Contributing

This being a Udacity students project I most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

<h1 align="center">Andekata</h1>
<p align="center">* version : 1.0.3-beta</p>
<p align="center">* codename : yudistira</p>
<p align="center">* license : MIT</p>

## About

Andekata merupakan aplikasi untuk mengolah informasi data pada sebuah Desa yang dikembangkan dengan tujuan untuk memenuhi beberapa kebutuhan mulai dari mencatat data kependudukan hingga keperluan administrasi surat menyurat. Untuk kedepannya, aplikasi ini akan terus dikembangkan dengan menyesuaikan kebutuhan yang terus bertambah.

## Andekata Web Client 

Repository Andekata Web Client ini dikembangkan menggunakan framework Javascript ReactJs. Andekata Web Client terhubung dengan [Andekata API] (https://github.com/ajaroid/andekata-api) sebagai penyedia API.

## Requirements

* [nodejs & npm](https://nodejs.org) (download versi stabil terkini) 
    - *Catatan:* Pastikan install nodejs terlebih dahulu sebelum menginstall tools yang lain
* [yarn](https://yarnpkg.com)
    - `npm i -g yarn`
* [standardjs](https://standardjs.com) 
    - `npm i -g standard`
    - install [editor plugin](https://standardjs.com/#are-there-text-editor-plugins) untuk pengecekan kesalahan & perbaikan secara otomatis

## Installation

Clone project :

* Dengan https :

```
git clone https://github.com/ajaroid/andekata-client.git
```

* Dengan ssh :

```
git clone git@github.com:ajaroid/andekata-client.git
```

Setelah clone project, install dependensi dengan menjalankan perintah berikut di folder project :
```
yarn
```

## Setup `.env`

Salin file `.env.example` dengan nama `.env`

Sesuaikan `REACT_APP_BASE_API_URL` dengan url `Andekata API` yang anda jalankan

```
REACT_APP_BASE_API_URL=<url server andekata api yang digunakan>

# contoh
REACT_APP_BASE_API_URL=http://127.0.0.1:8000
```

Untuk info lengkap mengenai konfigurasi di file `.env`, anda bisa merujuk ke [sini](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)


## Menjalankan Aplikasi

Jalankan aplikasi dengan menggunakan perintah berikut:

```
yarn start
``` 

Browser akan otomatis terbuka dan mengarah ke `http://localhost:3000`. Jika browser tidak terbuka secara otomatis, anda bisa mengaksesnya secara manual.

## How to Use / Testing

### User Testing

Akses sistem dengan menggunakan akun yg sudah tersedia secara default :

- `[superadmin]` : superadmin@ajaro.id | superadminsuperadmin
- `[admin]` : admin@ajaro.id | adminadmin
- `[petugas]` : petugas@ajaro.id | petugaspetugas


## Panduan kontribusi

Demi keseragaman pengembangan, repository ini dikembangkan dengan menganut panduan dari [standardjs](https://standardjs.com/rules.html).
Untuk mendapatkan fitur pengecekan kesalahan (dan perbaikan) secara otomatis, silahkan install [standardjs](https://standardjs.com/#are-there-text-editor-plugins) untuk text editor yang digunakan.

## Built With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://gitlab.com/ajaro-id/simdes/simdes-api/tags).

## Authors

* **Andhika Yuana** - *yuana* - [Facebook](https://www.facebook.com/yuana.andhika)
* **Arif Yeri Pratama** - *pirey*
* **Shinta Saptarini** - *shintasapta*
* **Syahroni** - *syahrn*

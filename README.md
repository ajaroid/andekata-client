# Andekata Web Client

Repository ini merupakan aplikasi untuk keperluan surat menyurat berbasis web (menggunakan react) pada kelurahan yang terhubung dengan [Andekata API](https://github.com/ajaroid/andekata-api)

## Setup

### Prerequisites
* [nodejs & npm](https://nodejs.org) (download versi stabil terkini) 
    - *Catatan:* Pastikan install nodejs terlebih dahulu sebelum menginstall tools yang lain
* [yarn](https://yarnpkg.com)
    - `npm i -g yarn`
* [standardjs](https://standardjs.com) 
    - `npm i -g standard`
    - install [editor plugin](https://standardjs.com/#are-there-text-editor-plugins) untuk pengecekan kesalahan & perbaikan secara otomatis

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

### Setup `.env`

Salin file `.env.example` dengan nama `.env`

Sesuaikan `REACT_APP_BASE_API_URL` dengan url `Andekata API` yang anda jalankan

```
REACT_APP_BASE_API_URL=<url server andekata api yang digunakan>

# contoh
REACT_APP_BASE_API_URL=http://127.0.0.1:8000
```

Untuk info lengkap mengenai konfigurasi di file `.env`, anda bisa merujuk ke [sini](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)


## Jalankan Aplikasi

Jalankan aplikasi dengan menggunakan perintah berikut:

```
yarn start
``` 

Setelah itu, browser akan otomatis terbuka dan mengarah ke `http://localhost:3000`. Jika browser tidak terbuka secara otomatis, anda bisa mengaksesnya secara manual.

## Testing

### User Testing

Anda bisa mencoba mengakses sistem dengan menggunakan akun yg sudah tersedia secara default :

- `[superadmin]` : superadmin@ajaro.id | superadminsuperadmin
- `[admin]` : admin@ajaro.id | adminadmin
- `[petugas]` : petugas@ajaro.id | petugaspetugas


### Panduan kontribusi

Demi keseragaman pengembangan, repository ini dibangun dengan menganut panduan dari [standardjs](https://standardjs.com/rules.html).
Untuk mendapatkan fitur pengecekan kesalahan (dan perbaikan) secara otomatis, silahkan install [standardjs](https://standardjs.com/#are-there-text-editor-plugins) untuk text editor yang digunakan.

## Built With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://gitlab.com/ajaro-id/simdes/simdes-api/tags).

## Authors

* **Andhika Yuana** - *yuana* - [Facebook](https://www.facebook.com/yuana.andhika)
* **Who are You ?** - *whoru* - [Facebook](#)

## License

*TODO*

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc


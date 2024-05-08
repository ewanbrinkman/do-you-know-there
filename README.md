<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT
License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<br />
<div align="center">
  <h1 align="center">Do You Know There?</h1>

  <p align="center">
    A game to test your knowledge of an area.
    <br />
    Live Project: <a href="https://doyouknowthere.com"><strong>https://doyouknowthere.com</strong></a>
    <br />
    <br />
    <a href="https://github.com/ewanbrinkman/do-you-know-there/issues">Report Bug</a>
    ·
    <a href="https://github.com/ewanbrinkman/do-you-know-there/issues">Request Feature</a>
  </p>
</div>

<!-- Table of contents. -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#quick-links">Quick Links</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

Live Project: [https://doyouknowthere.com](https://doyouknowthere.com)

This project was made to be a fun game to guess locations for an area. It aims
to be simple to understand and use.

You can use it to test your knowledge of somewhere you already know, or even to
get more familiar with someplace you don't know yet.

Throughout the project, the terms "area" and "location" are used. "Area" refers
to a bounded region on the map where the player guesses. "Location" refers to a
specific point on the map that the player is trying to guess.

**This project is not endorsed or supported by Simon Fraser University.**

## Quick Links

-   [How To Add New Locations To An Area](#how-to-add-new-locations-to-an-area)
-   [How To Create A New Area](#how-to-create-a-new-area)

## Getting Started

Instructions for how to set up locally are below.

### Prerequisites

-   node
-   npm _(comes with node)_

### Installation

1. Clone this repository. For example, if using SSH:
    ```sh
    git clone git@github.com:ewanbrinkman/do-you-know-there.git
    ```
2. Go to the directory of `do-you-know-there`.
    ```sh
    cd do-you-know-there
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```
4. Start the dev server.
    ```sh
    npm run dev
    ```

For hosting, update `baseUrl` in [src/app/sitemap.ts](src/app/sitemap.ts).

## Usage

To see how to set up the game locally on a development server, follow the steps
under [Getting Started](#getting-started).

Currently, the project only supports having one area. The area is set in
[src/app/components/Features/Game/GameContainer/GameContainer.tsx](src/app/components/Features/Game/GameContainer/GameContainer.tsx).
In the future, the goal is to let the player select from one of multiple
possible areas to play.

### How To Add New Locations To An Area

1. Open the file called `locations.json` under
   `src/assets/data/areas/<area>/locations.json`. This stores the data for each
   location (corresponding filename, coordinates, and so on). To get the
   location coordinates, one possible way for now is to add
   `console.log([e.latlng.lat, e.latlng.lng]);` in the `MapClickHandler` `click`
   of
   [src/app/components/Features/Game/GameMap/GameMap.tsx](src/app/components/Features/Game/GameMap/GameMap.tsx).
   Then, start the game and click somewhere on the map, and see the coordiates
   of the click logged in the console. I made a program to import data faster
   which lets you select on the map where the location should be. I might clean
   up the data importer and push the code eventually. Anyways, add your location
   to the JSON file, with properties as shown in the below example. The
   `locations.json` file should be like this:

```json
[
    {
        "id": 1,
        "filename": "filename1.jpg",
        "name": "Location 1",
        "difficulty": 3,
        "hint": "Location 1 hint.",
        "coordinates": {
            "lat": -90,
            "lng": -180
        },
        "keywords": ["keyword1", "keyword2"]
    },
    {
        "id": 2,
        "filename": "filename2.jpg",
        "name": "Location 2",
        "difficulty": 3,
        "hint": "Location 2 hint.",
        "coordinates": {
            "lat": 90,
            "lng": 180
        },
        "keywords": ["keyword1", "keyword4", "keyword7"]
    }
]
```

2. Add location images to `src/assets/images/areas/<area>/locations`. Make sure
   the filenames here match the filenames in `locations.json`.
3. Run `npm run build:images`. This will optimize the images and output them to
   `public/images/areas/<area>/locations`. The images in the `public` folder are
   the ones that are actually served to the client.

### How To Create A New Area

1.  Set the key of an area in
    [src/app/types/data/MapArea.ts](src/app/types/data/MapArea.ts). The string
    used in the enum must match the folder names in this project used for the
    area.
2.  Create a folder with the same name as the enum key at
    [src/assets/data/areas](src/assets/data/areas).
3.  Create a file called `info.json` under
    `src/assets/data/areas/<area>/info.json` with the following data:

```json
{
    "name": "Area Name",
    "description": "Area description."
}
```

4.  Create a file called `locations.json` under
    `src/assets/data/areas/<area>/locations.json`. Set the content of the file
    to be what appears below. To actually add locations, see
    [How To Add New Locations To An Area](#how-to-add-new-locations-to-an-area)

```json
[]
```

6.  Create a file called `map.json` with the following data (for zoom levels,
    experiment to see what works best):

```json
{
    "center": {
        "lat": 30,
        "lng": 150
    },
    "maxBounds": {
        "southwest": {
            "lat": -90,
            "lng": -180
        },
        "northeast": {
            "lat": 90,
            "lng": 180
        }
    },
    "zoom": {
        "initial": {
            "baseScreen": 16,
            "smallScreen": 15,
            "largeScreen": 17
        },
        "min": {
            "baseScreen": 15,
            "smallScreen": 15,
            "largeScreen": 16
        }
    }
}
```

## Contributing

For suggesting new areas and locations for an area: feel free to open an issue
[here](https://github.com/ewanbrinkman/do-you-know-there/issues).

For code changes: feel free to fork and create a pull request, or open an issue
[here](https://github.com/ewanbrinkman/do-you-know-there/issues).

## License

Distributed under the MIT License. See [`LICENSE`](/LICENSE) for more
information.

## Contact

Ewan Brinkman

Project Link:
[https://github.com/ewanbrinkman/do-you-know-there](https://github.com/ewanbrinkman/do-you-know-there)

## Acknowledgments

### Location Images

The following images were provided by other people. The name of the image
provider is given if the person wanted to have their name public.

-   For the [sfu-burnaby](/public/images/areas/sfu-burnaby/locations/) area:
    -   [3bc6566f6bf7b39a3bd2e4221dd79012ba8960d9.jpeg](/public/images/areas/sfu-burnaby/locations/3bc6566f6bf7b39a3bd2e4221dd79012ba8960d9.jpeg)
    -   [010394b2d4a955b7583636f5111e852e31854d8b.jpeg](/public/images/areas/sfu-burnaby/locations/010394b2d4a955b7583636f5111e852e31854d8b.jpeg)
    -   [57bc9c5058a29f4200e8d3393b9abcb880bbc7c3.jpeg](/public/images/areas/sfu-burnaby/locations/57bc9c5058a29f4200e8d3393b9abcb880bbc7c3.jpeg)
    -   [0c8f7c924cd121c28b76d6e7b089180a0c5066e8.jpeg](/public/images/areas/sfu-burnaby/locations/0c8f7c924cd121c28b76d6e7b089180a0c5066e8.jpeg)
    -   [45763c51aae04cd52d91c7019990422e9bc6214c.jpeg](/public/images/areas/sfu-burnaby/locations/45763c51aae04cd52d91c7019990422e9bc6214c.jpeg)
    -   [945e1d76dd89d9f7095e55ceb85efc6741f389f1.jpeg](/public/images/areas/sfu-burnaby/locations/945e1d76dd89d9f7095e55ceb85efc6741f389f1.jpeg)
    -   [21c41324f2d576ed82ac10d154acdd29302eb16f.jpeg](/public/images/areas/sfu-burnaby/locations/21c41324f2d576ed82ac10d154acdd29302eb16f.jpeg)
    -   [9adc27aee211f9329cb55372befad87f34d3a6d0.jpeg](/public/images/areas/sfu-burnaby/locations/9adc27aee211f9329cb55372befad87f34d3a6d0.jpeg)
    -   [af3f6d7f9e057ee5776d621d377ecd80f4a7fc2e.jpeg](/public/images/areas/sfu-burnaby/locations/af3f6d7f9e057ee5776d621d377ecd80f4a7fc2e.jpeg)
    -   [00eb78fcfb4d2ea6c0d4ab49f945a88333fe1574.jpeg](/public/images/areas/sfu-burnaby/locations/00eb78fcfb4d2ea6c0d4ab49f945a88333fe1574.jpeg)
    -   [03988cbf87430a3da28f4d743febaf718450a868.jpeg](/public/images/areas/sfu-burnaby/locations/03988cbf87430a3da28f4d743febaf718450a868.jpeg)
    -   [58f17ce4480d86a9c4f8402e23c56e74507e75ad.jpeg](/public/images/areas/sfu-burnaby/locations/58f17ce4480d86a9c4f8402e23c56e74507e75ad.jpeg)
    -   [680a6f7688ff6e5dc22143f9507c558d2c5f969f.jpeg](/public/images/areas/sfu-burnaby/locations/680a6f7688ff6e5dc22143f9507c558d2c5f969f.jpeg)
    -   [edfb76cc4a6e18652df2ec3c136f84c4dde04af3.jpeg](/public/images/areas/sfu-burnaby/locations/edfb76cc4a6e18652df2ec3c136f84c4dde04af3.jpeg)
    -   [2e4d1691540be3fcd6d0cddc3ccf9a74cbd4978b.jpeg](/public/images/areas/sfu-burnaby/locations/2e4d1691540be3fcd6d0cddc3ccf9a74cbd4978b.jpeg)
    -   [385f7ff380ded6a643f8815bb39a222d30b4f39d.jpeg](/public/images/areas/sfu-burnaby/locations/385f7ff380ded6a643f8815bb39a222d30b4f39d.jpeg)
    -   [4ece99ea4ade30626f62f4f7b1ac583b84f6ec8c.jpeg](/public/images/areas/sfu-burnaby/locations/4ece99ea4ade30626f62f4f7b1ac583b84f6ec8c.jpeg)
    -   [ad0f1b4c85ba808ca8e40154ae74887a7f421a6e.jpeg](/public/images/areas/sfu-burnaby/locations/ad0f1b4c85ba808ca8e40154ae74887a7f421a6e.jpeg)

<!-- Markdown links and images. -->

[contributors-shield]:
    https://img.shields.io/github/contributors/ewanbrinkman/do-you-know-there.svg?style=for-the-badge
[contributors-url]:
    https://github.com/ewanbrinkman/do-you-know-there/graphs/contributors
[forks-shield]:
    https://img.shields.io/github/forks/ewanbrinkman/do-you-know-there.svg?style=for-the-badge
[forks-url]: https://github.com/ewanbrinkman/do-you-know-there/network/members
[stars-shield]:
    https://img.shields.io/github/stars/ewanbrinkman/do-you-know-there.svg?style=for-the-badge
[stars-url]: https://github.com/ewanbrinkman/do-you-know-there/stargazers
[issues-shield]:
    https://img.shields.io/github/issues/ewanbrinkman/do-you-know-there.svg?style=for-the-badge
[issues-url]: https://github.com/ewanbrinkman/do-you-know-there/issues
[license-shield]:
    https://img.shields.io/github/license/ewanbrinkman/do-you-know-there.svg?style=for-the-badge
[license-url]:
    https://github.com/ewanbrinkman/do-you-know-there/blob/main/LICENSE
[linkedin-shield]:
    https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ewan-brinkman

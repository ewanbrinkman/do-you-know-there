<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
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

## Usage

To see how to set up the game locally on a development server, follow the steps
under [Getting Started](#getting-started).

### Modifying Areas And Locations

Currently, the project only supports having one area. The area is set in
[src/app/components/Features/Game/GameContainer/GameContainer.tsx](src/app/components/Features/Game/GameContainer/GameContainer.tsx).
In the future, the goal is to let the player select from one of multiple
possible areas to play.

To set up an area, do the following:

-   Set the key of an area in
    [src/app/types/data/MapArea.ts](src/app/types/data/MapArea.ts). The string
    used in the enum must match the folder names in this project used for the
    area.
-   Create a folder with the same name as the enum key at
    [src/assets/data/areas](src/assets/data/areas).
-   Create a file called `info.json` with the following data:

```json
{
    "name": "Area Name",
    "description": "Area description."
}
```

-   Create a file called `locations.json`. This will store the data for each
    location (corresponding filename, coordinates, and so on). To get the
    location coordinates, one possible way for now is to add
    `console.log([e.latlng.lat, e.latlng.lng]);` in the `MapClickHandler`
    `click` of
    [src/app/components/Features/Game/GameMap/GameMap.tsx](src/app/components/Features/Game/GameMap/GameMap.tsx).
    Then, start the game and click somewhere on the map, and see the coordiates
    of the click logged in the console. Anyways, place a list of objects in this
    file, with properties as shown in the below example:

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

-   Create a file called `map.json` with the following data (for zoom levels,
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
            "smallScreen": 15
        },
        "min": {
            "baseScreen": 15,
            "smallScreen": 15
        }
    }
}
```

-   Add location images to `public/areas/<area-name>/locations/`. Make sure the
    filenames here match the filenames in `locations.json`.

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

-   For the [sfu-burnaby](/public/areas/sfu-burnaby/locations/) area:
    -   [bridge-snowy.jpg](/public/areas//sfu-burnaby/locations/bridge-snowy.jpg)
    -   [bus-loop-foggy.jpg](/public/areas//sfu-burnaby/locations/bus-loop-foggy.jpg)
    -   [dark-snowy-road.jpg](/public/areas//sfu-burnaby/locations/dark-snowy-road.jpg)
    -   [library-view-from-rooftop-foggy.jpg](/public/areas//sfu-burnaby/locations/library-view-from-rooftop-foggy.jpg)
    -   [looking-over-near-aq-pond.jpg](/public/areas//sfu-burnaby/locations/looking-over-near-aq-pond.jpg)
    -   [near-aq-pond-snowy.jpg](/public/areas//sfu-burnaby/locations/near-aq-pond-snowy.jpg)
    -   [rooftop-parking.jpg](/public/areas//sfu-burnaby/locations/rooftop-parking.jpg)
    -   [rotunda-top-west.jpg](/public/areas//sfu-burnaby/locations/rotunda-top-west.jpg)
    -   [sub-dark.jpg](/public/areas//sfu-burnaby/locations/sub-dark.jpg)
    -   [sub-stairs.jpg](/public/areas//sfu-burnaby/locations/sub-stairs.jpg)

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

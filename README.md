# Skoove Coding Challenge

## The following rules apply:

Please read the [root readme file](https://github.com/Learnfield-GmbH/CodingChallenge/blob/master/README.md).

## The exercise

The application is able to load data from a server and playback the associated audio content.

### The application

1. Fetch the content of the manifest file<sup>1</sup> and show it in a scrollable list. (support reloading the manifest file).
    - Each tile shows a non interactive rating element displayed as stars
    - Each tile shows an interactive element to set the song as a favorite. There can only be one favorite set. As soon as a song is set as favorite, all others are set to non-favorite
2. Upon clicking on one of the list entries, the application shall navigate to a new screen
3. This new screen displays the content of the selected element. Additionally it shows:
    - A play button on top of the cover image which starts / stops the playback of the associated audio file
    - Audio playback control (load, play, pause and seek)
    - A position slider which updates its position depending on the position of the currently playing audio. It should also be able to control the current audio position with this slider<sup>2</sup>
    - The current play time and the audio duration<sup>2</sup>
    - The interactive rating element displayed as stars. Rating can be set here
    - The interactive favorite element to set the song as a favorite. (As above, there can only be one favorite set. As soon as a song is set as favorite, all others are set to non-favorite)

### Tips

-   It is okay to start the development of the mobile application with appropriate components being hidden behind an abstraction layer and firstly being implemented simple, local mocks. (E.g. The network connectivity. Once all functionality is verified with this non-networking implementation, the real network implementation can be added.)
-   In case you introduce abstractions and temporar mocks, please preserve both implementations.
-   Reuse components wherever applicable.
-   You can find some assets in the `assets` folder.

### Footnotes

<sup>1</sup>You can find the [manifest file here](data/manifest.json). [Direct link](https://raw.githubusercontent.com/Learnfield-GmbH/CodingChallenge/master/react%20native/simple%20audio%20player/data/manifest.json)

<sup>2</sup>Update the value at an appropriate frequency

### User Interface Mockup

![Simple audio player mockup][simple audio player mockup]

[simple audio player mockup]: mockup.png

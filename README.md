# Memory Card Project

## Sketch of what it is supposed to do

A series of cards with images will be displayed.
These images should be unique.
users will be able to click each card.
Cards, once clicked, cannot have their image clicked again unless you lose.

The number of correct clicks should be marked
The high score for this number of clicks should be marked
The score is reset to 0 if someone loses

## Code Plan

1. Game Component:
    * Attributes (some are props, some are not.  Not yet known which are which): {
        images: [
            {
                filepath: fpath to image we are using ( could be API driven as well )
                title: string title to accompany the image ( for screenreaders primarily )
            }
        ]
        selectedImages: [
            UID for images that have been selected
        ]
        score: default = 0.  Int that increments each time an image is selected
    }

    * Mount:
        * When the components mount the following must happen ONLY once:
            * API calls to gather images (alternatively we can get the images from some saved file, but the same logic holds true)
    * Click Handle (key => {
        check if key is in the selectedImages attribute
        if True: endGame()
        else: score++
    })

    * Game End:
        * Set the high score on the next game if applicable
        * Remount the Game component
2. Card Component:
    * Attributes: {
        filepath: which filepath to load the image
        title: string title to write
        hadleClick: function to update the Game component.
        UID: some UID (key?)
    }
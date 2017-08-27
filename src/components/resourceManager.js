// requiring images needs hardcoded paths, no dynamic generation of URIs.  So we need to manually map every page to it's images and sound effects


_resourcesByPage = [
    {   pageId: 'dc86ea51-081d-4528-b77c-0788a1fd61ec', 
        image: require('../../img/dd3188af-b523-4746-bf21-a892861ac004/dc86ea51-081d-4528-b77c-0788a1fd61ec/main.png'),
        soundEffect: require('../../audio/fart.mp3'),
        reading: require('../../audio/reading2.mp3')
    },
    
    {   pageId: '40d5fa6c-f426-2581-4d02-a0c5bd42fcf1', 
    image: require('../../img/dd3188af-b523-4746-bf21-a892861ac004/dc86ea51-081d-4528-b77c-0788a1fd61ec/main.png'),
    soundEffect: require('../../audio/fart.mp3'),
    reading: require('../../audio/reading2.mp3'),
},
{   pageId: '68823aa1-7f15-82b6-41fc-12380386a29e', 
image: require('../../img/dd3188af-b523-4746-bf21-a892861ac004/dc86ea51-081d-4528-b77c-0788a1fd61ec/main.png'),
soundEffect: require('../../audio/fart.mp3'),
reading: require('../../audio/reading2.mp3')
}
]

export function getImageForPage(pageId)
{
    return _resourcesByPage.filter(p => p.pageId === pageId)[0].image;
}

export function getSoundEffectForPage(pageId)
{
    return _resourcesByPage.filter(p => p.pageId === pageId)[0].soundEffect;
}

export function getReadingForPage(pageId)
{
    return _resourcesByPage.filter(p => p.pageId === pageId)[0].reading;
}
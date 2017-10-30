
import Reactotron from 'reactotron-react-native';

// requiring images needs hardcoded paths, no dynamic generation of URIs.  So we need to manually map every page to its images and sound effects
_resourcesByBook = [
    {
        bookId:'c08310da-aa1e-4c28-a29d-510ef4b44d97',
        coverImage: require("../../img/pages/monster/cover.jpg"),
        endImage: require("../../img/pages/monster/end.jpg"),
    }
]

_resourcesByPage = [
    {
        pageId: 'b09b639d-6e09-4d58-96e3-44b810df4170', 
        pageNumber: '1', 
        image: require('../../img/pages/monster/page1.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page1_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page1_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page1_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice2.png'),
            },
            {
                image: require('../../img/pages/monster/choice3.png'),
            }
        ]
        },
        {
        pageId: '7ff0aa4d-0c52-4b2b-b563-50e0e3764431', 
        pageNumber: '2', 
        image: require('../../img/pages/monster/page2.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page2_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page2_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page2_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice4.png'),
            },
            {
                image: require('../../img/pages/monster/choice5.png'),
            }
        ]
        },
        {
        pageId: '66ccb95d-0084-44a7-a2f1-b0e20db47f33', 
        pageNumber: '3', 
        image: require('../../img/pages/monster/page3.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page3_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page3_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page3_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice6.png'),
            },
            {
                image: require('../../img/pages/monster/choice7.png'),
            }
        ]
        },
        {
        pageId: 'a06eb728-03c6-4810-8d5d-55b28e37e67e', 
        pageNumber: '4', 
        image: require('../../img/pages/monster/page4.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page4_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page4_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page4_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice8.png'),
            },
            {
                image: require('../../img/pages/monster/choice9.png'),
            }
        ]
        },
        {
        pageId: '7e55b594-e38b-4ac5-bb16-91e60376fbe0', 
        pageNumber: '5', 
        image: require('../../img/pages/monster/page5.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page5_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page5_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page5_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice10.png'),
            },
            {
                image: require('../../img/pages/monster/choice11.png'),
            }
        ]
        },
        {
        pageId: 'ceeeec56-3455-4d41-89ba-2ca5930b6fec', 
        pageNumber: '6', 
        image: require('../../img/pages/monster/page6.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page6_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page6_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page6_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice12.png'),
            },
            {
                image: require('../../img/pages/monster/choice13.png'),
            }
        ]
        },
        {
        pageId: 'b0758b8d-51e2-4d36-a328-215ce1271d9a', 
        pageNumber: '7', 
        image: require('../../img/pages/monster/page7.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page7_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page7_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page7_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice14.png'),
            },
            {
                image: require('../../img/pages/monster/choice15.png'),
            }
        ]
        },
        {
        pageId: '59b292a4-b3ef-45ca-86b9-ad77e022c500', 
        pageNumber: '8', 
        image: require('../../img/pages/monster/page8.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page8_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page8_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page8_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice16.png'),
            },
            {
                image: require('../../img/pages/monster/choice17.png'),
            }
        ]
        },
        {
        pageId: 'b5e108e0-baee-49ed-aca6-2d5bf707ebfc', 
        pageNumber: '9', 
        image: require('../../img/pages/monster/page9.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page9_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page9_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page9_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice18.png'),
            },
            {
                image: require('../../img/pages/monster/choice19.png'),
            }
        ]
        },
        {
        pageId: '3ed66707-225a-4e1f-be4d-c3aa5cf1ec96', 
        pageNumber: '10', 
        image: require('../../img/pages/monster/page10.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page10_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page10_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page10_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice20.png'),
            },
            {
                image: require('../../img/pages/monster/choice21.png'),
            }
        ]
        },
        {
        pageId: '3023dad3-b9eb-4475-a1e4-2c0a81e76709', 
        pageNumber: '11', 
        image: require('../../img/pages/monster/page11.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page11_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page11_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page11_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice22.png'),
            },
            {
                image: require('../../img/pages/monster/choice23.png'),
            }
        ]
        },
        {
        pageId: 'aa8dcae6-265b-4999-a4b2-c595ddb01155', 
        pageNumber: '12', 
        image: require('../../img/pages/monster/page12.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page12_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page12_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page12_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice24.png'),
            },
            {
                image: require('../../img/pages/monster/choice25.png'),
            }
        ]
        },
        {
        pageId: 'b2569004-eb36-48ff-b393-c910a0a6e8f9', 
        pageNumber: '13', 
        image: require('../../img/pages/monster/page13.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page13_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page13_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page13_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice26.png'),
            },
            {
                image: require('../../img/pages/monster/choice27.png'),
            }
        ]
        },
        {
        pageId: 'e7c17ef5-d792-423f-9fb4-a22f671ffffb', 
        pageNumber: '14', 
        image: require('../../img/pages/monster/page14.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page14_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page14_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page14_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice28.png'),
            },
            {
                image: require('../../img/pages/monster/choice29.png'),
            }
        ]
        },
        {
        pageId: '185df49d-fd58-4167-bc84-64586f06ddcb', 
        pageNumber: '15', 
        image: require('../../img/pages/monster/page15.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page15_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page15_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page15_reading3.mp3'
          },
        ],
        choiceImages: [
            {
                image: require('../../img/pages/monster/choice30.png'),
            },
            {
                image: require('../../img/pages/monster/choice31.png'),
            }
        ]
        },
        {
        pageId: 'cab50beb-063b-4ccf-8648-179345f6769c', 
        pageNumber: '16', 
        image: require('../../img/pages/monster/page16.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page16_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page16_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page16_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page16_reading4.mp3'
          },
        ]
        },
        {
        pageId: 'bb43f739-6936-4ac9-ab74-ff492fc0473e', 
        pageNumber: '17', 
        image: require('../../img/pages/monster/page17.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page17_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page17_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page17_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page17_reading4.mp3'
          },
        ]
        },
        {
        pageId: '93abeebb-e4a2-4266-845f-debc2e09f4d0', 
        pageNumber: '18', 
        image: require('../../img/pages/monster/page18.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page18_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page18_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page18_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page18_reading4.mp3'
          },
          {
            part: 5,
            audio: 'monster_page18_reading5.mp3'
          },
        ]
        },
        {
        pageId: '5048456f-4cdf-42d6-bd1c-a7aead85ec10', 
        pageNumber: '19', 
        image: require('../../img/pages/monster/page19.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page19_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page19_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page19_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page19_reading4.mp3'
          },
        ]
        },
        {
        pageId: '78beb6a0-796f-41af-9239-71d6ecffcf54', 
        pageNumber: '20', 
        image: require('../../img/pages/monster/page20.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page20_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page20_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page20_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page20_reading4.mp3'
          },
        ]
        },
        {
        pageId: '6203007a-5fe6-4e5b-84d9-f7a64062ee77', 
        pageNumber: '21', 
        image: require('../../img/pages/monster/page21.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page21_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page21_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page21_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page21_reading4.mp3'
          },
        ]
        },
        {
        pageId: '3f0fec4a-34e5-41cf-ae93-b7eaf177beb5', 
        pageNumber: '22', 
        image: require('../../img/pages/monster/page22.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page22_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page22_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page22_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page22_reading4.mp3'
          },
          {
            part: 5,
            audio: 'monster_page22_reading5.mp3'
          },
        ]
        },
        {
        pageId: '163f38d8-7149-4e4f-b896-85a405b1ca0f', 
        pageNumber: '23', 
        image: require('../../img/pages/monster/page23.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page23_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page23_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page23_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page23_reading4.mp3'
          },
        ]
        },
        {
        pageId: '85521619-d50e-4e01-9e29-60295839751e', 
        pageNumber: '24', 
        image: require('../../img/pages/monster/page24.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page24_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page24_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page24_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page24_reading4.mp3'
          },
        ]
        },
        {
        pageId: 'a9ef6aea-3eae-471d-9eb4-854ba2fc4af3', 
        pageNumber: '25', 
        image: require('../../img/pages/monster/page25.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page25_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page25_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page25_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page25_reading4.mp3'
          },
        ]
        },
        {
        pageId: 'bde692a3-13ab-4718-ae8a-9ceed77e34c5', 
        pageNumber: '26', 
        image: require('../../img/pages/monster/page26.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page26_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page26_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page26_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page26_reading4.mp3'
          },
        ]
        },
        {
        pageId: '1d5444e3-be7b-4f46-b0e4-d2509f8b7dbd', 
        pageNumber: '27', 
        image: require('../../img/pages/monster/page27.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page27_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page27_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page27_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page27_reading4.mp3'
          },
        ]
        },
        {
        pageId: 'd7dbe138-f2b6-4b18-b918-afd60040c54b', 
        pageNumber: '28', 
        image: require('../../img/pages/monster/page28.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page28_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page28_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page28_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page28_reading4.mp3'
          },
        ]
        },
        {
        pageId: '941432ec-54ca-4685-8315-6459a2642144', 
        pageNumber: '29', 
        image: require('../../img/pages/monster/page29.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page29_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page29_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page29_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page29_reading4.mp3'
          },
          {
            part: 5,
            audio: 'monster_page29_reading5.mp3'
          },
        ]
        },
        {
        pageId: '88034f26-fd28-4ba7-8da4-8b864839ac01', 
        pageNumber: '30', 
        image: require('../../img/pages/monster/page30.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page30_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page30_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page30_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page30_reading4.mp3'
          },
        ]
        },
        {
        pageId: 'df8c6c19-33d9-4014-a5a8-873054150d0b', 
        pageNumber: '31', 
        image: require('../../img/pages/monster/page31.jpg'),
        soundEffect: require('../../audio/fart.mp3'),
        readings: [
          {
            part: 1,
            audio: 'monster_page31_reading1.mp3'
          },
          {
            part: 2,
            audio: 'monster_page31_reading2.mp3'
          },
          {
            part: 3,
            audio: 'monster_page31_reading3.mp3'
          },
          {
            part: 4,
            audio: 'monster_page31_reading4.mp3'
          },
        ]
        },                    
]

export function getImageForPage(pageId)
{
    return _resourcesByPage.filter(p => p.pageId === pageId)[0].image;
}

export function getChoiceImageForPage(pageId, index)
{
    var choiceImages = _resourcesByPage.filter(p => p.pageId === pageId)[0].choiceImages;
    if (!choiceImages) return require('../../img/pages/monster/choice2.png');
    var choiceImage = choiceImages[index];
    return choiceImage ? choiceImage.image : null;
}

export function getSoundEffectForPage(pageId)
{
    return _resourcesByPage.filter(p => p.pageId === pageId)[0].soundEffect;
}

export function getReadingForPage(pageId, partId)
{
    var readings = _resourcesByPage.filter(p => p.pageId === pageId)[0].readings;
    if (!readings) return null;
    var reading = readings.filter(r => r.part == partId)[0];
    return reading ? reading.audio : null;
}

export function getCoverForBook(bookId)
{
    return _resourcesByBook.filter(b => b.bookId === bookId)[0].coverImage;
}
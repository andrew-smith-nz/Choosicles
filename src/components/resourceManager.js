
import Reactotron from 'reactotron-react-native';

// requiring images needs hardcoded paths, no dynamic generation of URIs.  So we need to manually map every page to its images and sound effects
_resourcesByBook = [
    {
        bookId:'c08310da-aa1e-4c28-a29d-510ef4b44d97',
        coverImage: require("../../img/pages/monster/cover.png"),
        coverImageLeftHalf: require("../../img/pages/monster/cover_lefthalf.png"),
        coverImageRightHalf: require("../../img/pages/monster/cover_righthalf.png"),
        startAudio: 'monster_start_audio.mp3',
        startSoundEffect: 'monster_start_soundEffect.mp3',
        endImage:  require("../../img/pages/monster/end.png"),
        endAudio: 'monster_end_audio.mp3'
    },
    {
      bookId: 'A588E22D-D984-D28D-4690-D8AD87A14D63',
      coverImage: require("../../img/pages/seacreature/cover.png"),
      coverImageLeftHalf: require("../../img/pages/seacreature/cover_lefthalf.png"),
      coverImageRightHalf: require("../../img/pages/seacreature/cover_righthalf.png")
    }
]

_resourcesByPage = [

    // Monster
    {
        pageId: 'b09b639d-6e09-4d58-96e3-44b810df4170', 
        pageNumber: '1', 
        image: require('../../img/pages/monster/page1.jpg'),
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
        image: require('../../img/pages/monster/page16.jpg')
        },
        {
        pageId: 'bb43f739-6936-4ac9-ab74-ff492fc0473e', 
        pageNumber: '17', 
        image: require('../../img/pages/monster/page17.jpg')
        },
        {
        pageId: '93abeebb-e4a2-4266-845f-debc2e09f4d0', 
        pageNumber: '18', 
        image: require('../../img/pages/monster/page18.jpg')
        },
        {
        pageId: '5048456f-4cdf-42d6-bd1c-a7aead85ec10', 
        pageNumber: '19', 
        image: require('../../img/pages/monster/page19.jpg')
        },
        {
        pageId: '78beb6a0-796f-41af-9239-71d6ecffcf54', 
        pageNumber: '20', 
        image: require('../../img/pages/monster/page20.jpg')
        },
        {
        pageId: '6203007a-5fe6-4e5b-84d9-f7a64062ee77', 
        pageNumber: '21', 
        image: require('../../img/pages/monster/page21.jpg')
        },
        {
        pageId: '3f0fec4a-34e5-41cf-ae93-b7eaf177beb5', 
        pageNumber: '22', 
        image: require('../../img/pages/monster/page22.jpg')
        },
        {
        pageId: '163f38d8-7149-4e4f-b896-85a405b1ca0f', 
        pageNumber: '23', 
        image: require('../../img/pages/monster/page23.jpg')
        },
        {
        pageId: '85521619-d50e-4e01-9e29-60295839751e', 
        pageNumber: '24', 
        image: require('../../img/pages/monster/page24.jpg')
        },
        {
        pageId: 'a9ef6aea-3eae-471d-9eb4-854ba2fc4af3', 
        pageNumber: '25', 
        image: require('../../img/pages/monster/page25.jpg')
        },
        {
        pageId: 'bde692a3-13ab-4718-ae8a-9ceed77e34c5', 
        pageNumber: '26', 
        image: require('../../img/pages/monster/page26.jpg')
        },
        {
        pageId: '1d5444e3-be7b-4f46-b0e4-d2509f8b7dbd', 
        pageNumber: '27', 
        image: require('../../img/pages/monster/page27.jpg')
        },
        {
        pageId: 'd7dbe138-f2b6-4b18-b918-afd60040c54b', 
        pageNumber: '28', 
        image: require('../../img/pages/monster/page28.jpg')
        },
        {
        pageId: '941432ec-54ca-4685-8315-6459a2642144', 
        pageNumber: '29', 
        image: require('../../img/pages/monster/page29.jpg')
        },
        {
        pageId: '88034f26-fd28-4ba7-8da4-8b864839ac01', 
        pageNumber: '30', 
        image: require('../../img/pages/monster/page30.jpg')
        },
        {
        pageId: 'df8c6c19-33d9-4014-a5a8-873054150d0b', 
        pageNumber: '31', 
        image: require('../../img/pages/monster/page31.jpg')
        },
        
        // Sea creature
        {
        pageId: 'AEDC706C-A30B-35A9-475D-5415AFA48631', 
        pageNumber: '1', 
        image: require('../../img/pages/seacreature/page1.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice2.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice3.png'),
            }
        ]
        },
        {
        pageId: '25CEDC33-7FA5-E999-4E06-8FA50CF3DFEE', 
        pageNumber: '2', 
        image: require('../../img/pages/seacreature/page2.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice4.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice5.png'),
            }
        ]
        },
        {
        pageId: '78A1BF40-A600-7AA7-4675-56D049C40746', 
        pageNumber: '3', 
        image: require('../../img/pages/seacreature/page3.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice6.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice7.png'),
            }
        ]
        },
        {
        pageId: 'DC394A1F-EF6B-AE8C-49AC-0AB78ECF3099', 
        pageNumber: '4', 
        image: require('../../img/pages/seacreature/page4.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice8.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice9.png'),
            }
        ]
        },
        {
        pageId: '254A0E98-E213-5CA4-42F1-69826EFFB79E', 
        pageNumber: '5', 
        image: require('../../img/pages/seacreature/page5.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice10.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice11.png'),
            }
        ]
        },
        {
        pageId: 'D71E5075-A84F-51B1-4765-4BDFB7FDB026', 
        pageNumber: '6', 
        image: require('../../img/pages/seacreature/page6.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice12.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice13.png'),
            }
        ]
        },
        {
        pageId: '1096E9EC-75F4-47B0-4678-DFE27CE844F6', 
        pageNumber: '7', 
        image: require('../../img/pages/seacreature/page7.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice14.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice15.png'),
            }
        ]
        },
        {
        pageId: '599D8236-5858-0EBB-4B00-6E830EF098B7', 
        pageNumber: '8', 
        image: require('../../img/pages/seacreature/page8.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice16.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice17.png'),
            }
        ]
        },
        {
        pageId: 'D224077B-663F-5387-4DAC-5EE93C079489', 
        pageNumber: '9', 
        image: require('../../img/pages/seacreature/page9.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice18.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice19.png'),
            }
        ]
        },
        {
        pageId: '929339B8-4A12-A99E-4D15-DBAD37AC097D', 
        pageNumber: '10', 
        image: require('../../img/pages/seacreature/page10.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice20.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice21.png'),
            }
        ]
        },
        {
        pageId: 'B8EBA124-8568-0F9A-4533-F096117E1B93', 
        pageNumber: '11', 
        image: require('../../img/pages/seacreature/page11.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice22.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice23.png'),
            }
        ]
        },
        {
        pageId: '9271C5A1-AD83-999D-423B-60A1EC416CDA', 
        pageNumber: '12', 
        image: require('../../img/pages/seacreature/page12.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice24.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice25.png'),
            }
        ]
        },
        {
        pageId: '1B15D4D3-C766-C29E-4384-EE15B3277CA7', 
        pageNumber: '13', 
        image: require('../../img/pages/seacreature/page13.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice26.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice27.png'),
            }
        ]
        },
        {
        pageId: 'C5211099-F4DC-D8BD-4780-051FDF0C8A73', 
        pageNumber: '14', 
        image: require('../../img/pages/seacreature/page14.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice28.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice29.png'),
            }
        ]
        },
        {
        pageId: 'FAAB7864-8EB9-88A9-4EA0-BC4946A9695F', 
        pageNumber: '15', 
        image: require('../../img/pages/seacreature/page15.jpg'),
        choiceImages: [
            {
                image: require('../../img/pages/seacreature/choice30.png'),
            },
            {
                image: require('../../img/pages/seacreature/choice31.png'),
            }
        ]
        },
        {
        pageId: '1CB9601D-A243-63BD-4A2B-45A2EB95508F', 
        pageNumber: '16', 
        image: require('../../img/pages/seacreature/page16.jpg')
        },
        {
        pageId: 'CDAEC680-9967-30B7-4EC8-15CB29F5C376', 
        pageNumber: '17', 
        image: require('../../img/pages/seacreature/page17.jpg')
        },
        {
        pageId: '5FE6F036-6B1C-3CAB-4AF9-11872E2C6457', 
        pageNumber: '18', 
        image: require('../../img/pages/seacreature/page18.jpg')
        },
        {
        pageId: '235D7A41-10EA-3C9E-4D25-785823C017DD', 
        pageNumber: '19', 
        image: require('../../img/pages/seacreature/page19.jpg')
        },
        {
        pageId: '3B5E812B-AB22-BEB0-40D3-E4B5542ACCC8', 
        pageNumber: '20', 
        image: require('../../img/pages/seacreature/page20.jpg')
        },
        {
        pageId: '6BEAEAE6-E03F-C98C-4869-5C44790C0B48', 
        pageNumber: '21', 
        image: require('../../img/pages/seacreature/page21.jpg')
        },
        {
        pageId: '2B76F98E-9B05-DD85-4D4D-21CE13FA4913', 
        pageNumber: '22', 
        image: require('../../img/pages/seacreature/page22.jpg')
        },
        {
        pageId: '3849EFA5-639E-CCB8-467D-186B468E9079', 
        pageNumber: '23', 
        image: require('../../img/pages/seacreature/page23.jpg')
        },
        {
        pageId: '418B0D28-AB28-9B9A-4200-0132AACE4EB2', 
        pageNumber: '24', 
        image: require('../../img/pages/seacreature/page24.jpg')
        },
        {
        pageId: '81B649FF-352D-BEA7-4ADA-CDD311A4BB9F', 
        pageNumber: '25', 
        image: require('../../img/pages/seacreature/page25.jpg')
        },
        {
        pageId: '8D4A540E-E50E-6296-4954-3C4C54F2C454', 
        pageNumber: '26', 
        image: require('../../img/pages/seacreature/page26.jpg')
        },
        {
        pageId: '1C5FCFA0-4332-F7B9-4835-5A64A2CFAB48', 
        pageNumber: '27', 
        image: require('../../img/pages/seacreature/page27.jpg')
        },
        {
        pageId: '5C44A0E9-0A3C-B38E-431D-D8E829CF81C6', 
        pageNumber: '28', 
        image: require('../../img/pages/seacreature/page28.jpg')
        },
        {
        pageId: 'A65E14EF-0E3E-3CAD-4A3E-FB9949F798F1', 
        pageNumber: '29', 
        image: require('../../img/pages/seacreature/page29.jpg')
        },
        {
        pageId: '0BBBEFC9-28A5-FDBC-4FD8-D83CC33E9793', 
        pageNumber: '30', 
        image: require('../../img/pages/seacreature/page30.jpg')
        },
        {
        pageId: '8DEDF121-7FFA-2E9A-4B5D-493DF861B7B2', 
        pageNumber: '31', 
        image: require('../../img/pages/seacreature/page31.jpg')
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

export function getEndSoundForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0];
    return book.endAudio;
}

export function getStartAudioForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0];
    return book.startAudio;
}

export function getStartSoundEffectForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0];
    return book.startSoundEffect;
}


export function getReadingForPage(pageId, partId)
{
    return 'Sound effect page ' + _resourcesByPage.filter(p => p.pageId === pageId)[0].pageNumber + '.mp3';
}

export function getCoverForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0]
    return book.coverImage;
}

export function getEndForBook(bookId)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0]
    return book.endImage;
}

export function getHalfCoverForBook(bookId, leftHalf)
{
    var book = _resourcesByBook.filter(b => b.bookId === bookId)[0]
    return leftHalf ? book.coverImageLeftHalf : book.coverImageRightHalf;
}